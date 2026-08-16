<h2>New order request</h2>
<p><strong>{{ $order->customer_name }}</strong> just submitted an order on Turo Turo.</p>

<table cellpadding="6" cellspacing="0" border="1" style="border-collapse: collapse;">
    <tr><td><strong>Segment</strong></td><td>{{ $order->segment }}</td></tr>
    <tr><td><strong>Service</strong></td><td>{{ $order->service }}</td></tr>
    <tr><td><strong>Subject</strong></td><td>{{ $order->subject ?? '—' }}</td></tr>
    <tr><td><strong>Coverage</strong></td><td>{{ $order->coverage ?? '—' }}</td></tr>
    <tr><td><strong>Notes</strong></td><td>{{ $order->notes ?? '—' }}</td></tr>
    <tr><td><strong>Facebook</strong></td><td>{{ $order->facebook_link ?? '—' }}</td></tr>
    <tr><td><strong>Contact number</strong></td><td>{{ $order->contact_number ?? '—' }}</td></tr>
    @if($order->template_path)
        <tr><td><strong>Template file</strong></td><td><a href="{{ asset('storage/' . $order->template_path) }}">Download attached template →</a></td></tr>
    @endif
</table>

<p style="margin-top: 16px;">
    <a href="http://localhost:3000/admin/orders">Open the admin panel to respond →</a>
</p>