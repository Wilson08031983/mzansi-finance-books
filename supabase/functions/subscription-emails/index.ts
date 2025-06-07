import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface EmailRequest {
  type: 'trial_start' | 'trial_ending' | 'trial_expired' | 'payment_success' | 'payment_failed'
  email: string
  company_name: string
  subscription_type?: string
  days?: number
}

serve(async (req) => {
  try {
    // Create a Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    // Get the request body
    const { type, email, company_name, subscription_type, days } = await req.json() as EmailRequest
    
    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email address is required' }),
        { headers: { 'Content-Type': 'application/json' }, status: 400 }
      )
    }
    
    // Construct email content based on type
    let subject = ''
    let content = ''
    
    switch (type) {
      case 'trial_start':
        subject = `Your MOKMzansiBooks 30-Day Trial Has Started!`
        content = `
          <h2>Welcome to MOKMzansiBooks!</h2>
          <p>Hello ${company_name},</p>
          <p>Your 30-day free trial has started. You now have full access to all MOKMzansiBooks features.</p>
          <p>When your trial ends, you'll need to choose a subscription plan to continue using all features.</p>
          <p><a href="https://mokmzansibooks.com/dashboard">Go to your dashboard</a></p>
          <p>Thank you for choosing MOKMzansiBooks!</p>
        `
        break
        
      case 'trial_ending':
        subject = `Your MOKMzansiBooks Trial Ends in ${days} Days`
        content = `
          <h2>Your Free Trial is Ending Soon</h2>
          <p>Hello ${company_name},</p>
          <p>Your MOKMzansiBooks free trial will end in ${days} days.</p>
          <p>To continue using all features without interruption, please subscribe to one of our plans.</p>
          <p><a href="https://mokmzansibooks.com/pricing">Choose a subscription plan</a></p>
          <p>Thank you for using MOKMzansiBooks!</p>
        `
        break
        
      case 'trial_expired':
        subject = `Your MOKMzansiBooks Trial Has Expired`
        content = `
          <h2>Your Free Trial Has Ended</h2>
          <p>Hello ${company_name},</p>
          <p>Your MOKMzansiBooks free trial has ended. Your access has been limited to basic features.</p>
          <p>To restore full access to all features, please subscribe to one of our plans.</p>
          <p><a href="https://mokmzansibooks.com/pricing">Choose a subscription plan</a></p>
          <p>Thank you for trying MOKMzansiBooks!</p>
        `
        break
        
      case 'payment_success':
        subject = `Your MOKMzansiBooks ${subscription_type} Subscription is Active`
        content = `
          <h2>Thank You for Your Subscription!</h2>
          <p>Hello ${company_name},</p>
          <p>Your ${subscription_type} subscription to MOKMzansiBooks is now active.</p>
          <p>You have full access to all features and will be billed ${subscription_type === 'Monthly' ? 'monthly' : 'annually'}.</p>
          <p><a href="https://mokmzansibooks.com/dashboard">Go to your dashboard</a></p>
          <p>Thank you for choosing MOKMzansiBooks!</p>
        `
        break
        
      case 'payment_failed':
        subject = `MOKMzansiBooks Payment Failed - Action Required`
        content = `
          <h2>Payment Failed - Action Required</h2>
          <p>Hello ${company_name},</p>
          <p>We were unable to process your payment for MOKMzansiBooks subscription.</p>
          <p>You currently have a 7-day grace period to update your payment method before your access is limited.</p>
          <p><a href="https://mokmzansibooks.com/settings/payment">Update payment method</a></p>
          <p>Thank you for using MOKMzansiBooks!</p>
        `
        break
        
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid email type' }),
          { headers: { 'Content-Type': 'application/json' }, status: 400 }
        )
    }
    
    // Send email using Supabase Edge Function capabilities
    // This is a placeholder - you'll need to use your email service provider
    console.log(`Sending ${type} email to ${email}`)
    console.log(`Subject: ${subject}`)
    console.log(`Content: ${content.substring(0, 100)}...`)
    
    // Here you would integrate with your email service (SendGrid, Mailgun, etc.)
    // For now, we'll return success without actually sending
    
    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Email queued for delivery',
        type,
        recipient: email
      }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
