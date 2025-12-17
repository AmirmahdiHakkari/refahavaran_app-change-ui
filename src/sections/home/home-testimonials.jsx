import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { MotionViewport } from 'src/components/animate';
import { Carousel, useCarousel, CarouselDotButtons } from 'src/components/carousel';

// ----------------------------------------------------------------------

export function HomeTestimonials({ sx, ...other }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGoLogin = () => {
    setLoading(true);
    router.replace('/auth/jwt/sign-in/');
  };

  const carousel = useCarousel({
    align: 'center',
    slidesToShow: { xs: 1 },
    loop: true,
  });

  const handleNextSlide = () => {
    const total = carousel.dots.scrollSnaps.length || 0;
    if (!total) return;

    const nextIndex = (carousel.dots.selectedIndex + 1) % total;
    carousel.dots.onClickDot(nextIndex);
  };

  return (
    <Stack
      component="section"
      direction="column"
      sx={{
        height: '100vh',
        position: 'relative',
        bgcolor: (theme) => theme.palette.primary.main,
        overflow: 'hidden',
        color: 'common.white',
        ...sx,
      }}
      {...other}
    >
      <Box
        sx={{
          flexShrink: 0,
          p: 2,
          px: 2.5,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Button
          variant="text"
          onClick={handleNextSlide}
          sx={{ fontSize: 13, color: 'common.white', textTransform: 'none' }}
          type="button"
        >
          بعدی
        </Button>

        <CarouselDotButtons
          variant="rounded"
          scrollSnaps={carousel.dots.scrollSnaps}
          selectedIndex={carousel.dots.selectedIndex}
          onClickDot={carousel.dots.onClickDot}
        />
      </Box>

      <MotionViewport
        sx={{
          height: '100%',
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: 420,
              height: '100%',
              maxHeight: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Carousel carousel={carousel} sx={{ bgcolor: 'red', height: '100%' }}>
              {ONBOARDING_SLIDES.map((slide, index) => (
                <Card
                  key={slide.id}
                  sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: (theme) => theme.customShadows?.z8 || theme.shadows[8],
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                    mx: 'auto',
                  }}
                >
                  {/* تصویر استوری */}
                  {/* <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: IMAGE_HEIGHT,
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={slide.image}
                      alt={slide.title || 'slide'}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 600px) 100vw, 600px"
                      priority={index === 0}
                    />
                  </Box> */}

                  {/* متن زیر تصویر */}
                  <Box
                    sx={{
                      p: 2.5,
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        mb: 1,
                        textAlign: 'center',
                        color: 'text.primary',
                      }}
                    >
                      {slide.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        textAlign: 'center',
                        lineHeight: 1.7,
                      }}
                    >
                      {slide.description}
                    </Typography>
                  </Box>
                </Card>
              ))}
            </Carousel>
          </Box>
        </Container>
      </MotionViewport>

      {/* فوتر پایین */}
      <Box
        sx={{
          flexShrink: 0,
          borderTop: '1px dashed white',
          py: 2,
          px: 2,
        }}
      >
        <Container maxWidth="sm">
          <LoadingButton
            fullWidth
            color="inherit"
            size="large"
            type="button"
            variant="contained"
            loading={loading}
            loadingIndicator="در حال ورود..."
            onClick={handleGoLogin}
            sx={{
              bgcolor: 'common.white',
              color: 'primary.main',
              '&:hover': { bgcolor: 'common.white' },
            }}
          >
            ورود
          </LoadingButton>
        </Container>
      </Box>
    </Stack>
  );
}

// ----------------------------------------------------------------------

const ONBOARDING_SLIDES = [
  {
    id: 1,
    title: 'خرید اقساطی بدون چک و ضامن',
    description: 'در چند دقیقه، اعتبارت رو فعال کن و خریدت رو قسطی انجام بده.',
    image: '/assets/images/product/landing1.png',
  },
  {
    id: 2,
    title: 'پرداخت اقساط بدون دغدغه',
    description: 'اقساطت رو منظم و خودکار پرداخت کن و خیالت راحت باشه.',
    image: '/assets/images/product/landing2.png',
  },
];
