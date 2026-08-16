<script setup lang="ts">
import { menuK12 } from '~/data/menuK12'
import { menuCollege } from '~/data/menuCollege'
</script>

<template>
  <div class="bg-cream text-charcoal font-body leading-relaxed">
    <AppHeader />
    <HeroBoard />
    <AboutSection />

    <MenuSection
      section-id="menu"
      eyebrow="Menu ngayong araw"
      title="Today's Specials"
      description="Starting rates — final quote depende sa subject, grade level, at bilang ng linggo. May sarili kang template? Sabihin mo lang."
      :items="menuK12"
    />

    <MenuSection
      section-id="college"
      eyebrow="Meron ding para sa Kolehiyo"
      title="College & University Menu"
      description="OBE-aligned course materials — built from real experience creating college-level modules and IMs for a professor. May sarili kang template? Sabihin mo lang."
      :items="menuCollege"
      tint
      is-college
    />

    <HowItWorks />
    <SamplesSection />
    <TestimonialReceipt />
    <ContactSection />
    <AppFooter />
    <StickyOrder />
  </div>
</template>