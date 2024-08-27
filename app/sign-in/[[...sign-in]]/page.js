import { Container, Typography, AppBar, Toolbar, Button, Box, CssBaseline } from '@mui/material';
import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: '#004d40' }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              color: '#ffffff'
            }}
          >
            FlashCard SaaS
          </Typography>
          <Button sx={{ color: 'white' }}>
            <Link href="/sign-in" passHref>
              Login
            </Link>
          </Button>
          <Button sx={{ color: 'white' }}>
            <Link href="/sign-up" passHref>
              Sign Up
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            mt: 5, 
            textAlign: 'center',
            backgroundColor: '#e0f2f1',
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold', color: '#004d40' }}>
            Welcome Back!
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: '#00796b' }}>
            Sign in to continue with us.
          </Typography>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
          </Box>
        </Box>
      </Container>
      <Box component="footer" sx={{ mt: 3, py: 2, backgroundColor: '#004d40' }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="white" align="center">
            {'© '}
            FlashCard SaaS {new Date().getFullYear()}
            {'. All rights reserved.'}
          </Typography>
        </Container>
      </Box>
    </>
  );
}
