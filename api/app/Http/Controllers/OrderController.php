<?php

namespace App\Http\Controllers;

use App\Mail\NewOrderReceived;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class OrderController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'customer_name'  => ['required', 'string', 'max:255'],
            'facebook_link'  => ['nullable', 'string', 'max:255'],
            'contact_number' => ['required', 'string', 'max:50'],
            'segment'        => ['required', 'in:elementary,junior_high,senior_high,college'],
            'service'        => ['required', 'string', 'max:255'],
            'subject'        => ['nullable', 'string', 'max:255'],
            'coverage'       => ['nullable', 'string', 'max:255'],
            'notes'          => ['nullable', 'string', 'max:2000'],
            'template'       => ['nullable', 'file', 'mimes:pdf,doc,docx,ppt,pptx,jpg,jpeg,png', 'max:10240'],
        ]);

        $templatePath = null;
        if ($request->hasFile('template')) {
            $templatePath = $request->file('template')->store('templates', 'public');
        }

        $orderData = collect($validated)->except('template')->toArray();
        $orderData['template_path'] = $templatePath;

        $order = Order::create($orderData);

        $adminEmail = config('mail.admin_address');
        if ($adminEmail) {
            try {
                Mail::to($adminEmail)->send(new NewOrderReceived($order));
            } catch (\Throwable $e) {
                Log::error('Failed to send new-order notification email: ' . $e->getMessage());
            }
        }

        return response()->json([
            'message' => 'Order request received. Expect a quote within the day.',
            'order'   => $order,
        ], 201);
    }

    public function index(Request $request): JsonResponse
    {
        $query = Order::query()->latest();

        if ($search = $request->query('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('customer_name', 'ILIKE', "%{$search}%")
                  ->orWhere('service', 'ILIKE', "%{$search}%")
                  ->orWhere('subject', 'ILIKE', "%{$search}%");
            });
        }

        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        return response()->json($query->paginate(20));
    }

    public function updateStatus(Request $request, Order $order): JsonResponse
    {
        $validated = $request->validate([
            'status'       => ['required', 'in:pending,confirmed,in_progress,delivered,cancelled'],
            'quoted_price' => ['nullable', 'numeric', 'min:0'],
        ]);

        $order->update($validated);

        return response()->json(['message' => 'Order updated.', 'order' => $order]);
    }
}