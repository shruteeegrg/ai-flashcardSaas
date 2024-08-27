'use client'
import Image from "next/image";
import getStripe from '@/utils/get-stripe'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Container, Toolbar, AppBar, Button, Typography, Box, Grid, useMediaQuery, IconButton } from "@mui/material";
import Head from "next/head";
import ArrowForward from '@mui/icons-material/ArrowForward';

export default function Home() {
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleSubmit = async () => {
    try {
      const checkoutSession = await fetch('/api/checkout_session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          origin: 'http://localhost:3000',
        },
      });

      const checkoutSessionJson = await checkoutSession.json();

      if (checkoutSession.status === 500) {
        console.error(checkoutSessionJson.message);
        return;
      }

      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutSessionJson.id,
      });

      if (error) {
        console.warn(error.message);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  return (
    <>
      <Head>
        <title>AceFlashcards</title>
        <meta name="description" content="Create flashcards from your text with AceFlashcards" />
      </Head>
      <AppBar position='static' sx={{ backgroundColor: '#004d40', boxShadow: 0 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#ffffff' }}>AceFlashcards</Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">Login</Button>
            <Button color="inherit" href="/sign-up">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            py: 6,
            my: 4,
            backgroundColor: '#e0f2f1',
            borderRadius: 2,
            boxShadow: 3,
            position: 'relative',
          }}
        >
          <Box
            sx={{
              flex: 1,
              px: 2,
              zIndex: 2,
            }}
          >
            <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#004d40' }}>
              Welcome to AceFlashcards
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ color: '#00796b' }}>
              Transform your text into powerful flashcards with ease
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2, px: 4 }} href="/generate">
              Get Started
              <ArrowForward sx={{ ml: 1 }} />
            </Button>
          </Box>
          <Box
            sx={{
              flex: 1,
              textAlign: 'center',
              mt: isMobile ? 4 : 0,
              position: 'relative',
              
            }}
          >
            <Image
              src="/image/flashcard3.jpeg"
              alt="AceFlashcards Hero"
              width={400}
              height={300}
              style={{ borderRadius: 10 }}
            />
          </Box>
        </Box>

        {/* Features Section */}
        <Box sx={{ my: 6 }}>
          <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4, color: '#004d40' }}>
            Features
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{
                textAlign: 'center',
                p: 3,
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 2,
                backgroundColor: '#e0f2f1',
                boxShadow: 2
              }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#004d40' }}>Easy Text Input</Typography>
                <Typography>
                  Simply input your text and let our software do the rest. Creating flashcards has never been easier.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{
                textAlign: 'center',
                p: 3,
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 2,
                backgroundColor: '#b2dfdb',
                boxShadow: 2
              }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#004d40' }}>Smart Flashcards</Typography>
                <Typography>
                  Our AI intelligently breaks down your text into concise flashcards, perfect for studying.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{
                textAlign: 'center',
                p: 3,
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 2,
                backgroundColor: '#e0f2f1',
                boxShadow: 2
              }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#004d40' }}>Accessible Anywhere</Typography>
                <Typography>
                  Access your flashcards from any device, at any time. Study on the go with ease.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Pricing Section */}
        <Box sx={{ my: 6 }}>
          <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4, color: '#004d40' }}>
            Pricing
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{
                p: 3,
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 2,
                backgroundColor: '#e0f2f1',
                textAlign: 'center',
                boxShadow: 2
              }}>
                <Typography variant="h5" gutterBottom>Basic</Typography>
                <Typography variant="h6" gutterBottom>$5/month</Typography>
                <Typography>
                  Access to basic flashcard features and limited storage.
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }} href="/choose-basic">Choose Basic</Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{
                p: 3,
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 2,
                backgroundColor: '#b2dfdb',
                textAlign: 'center',
                boxShadow: 2
              }}>
                <Typography variant="h5" gutterBottom>Pro</Typography>
                <Typography variant="h6" gutterBottom>$10/month</Typography>
                <Typography>
                  Unlimited flashcards and storage with priority support.
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}>Choose Pro</Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Footer */}
      <Box component="footer" sx={{ py: 2, backgroundColor: '#004d40', color: '#ffffff', textAlign: 'center' }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="inherit">
            {'© '}AceFlashcards {new Date().getFullYear()}. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </>
  )
}
