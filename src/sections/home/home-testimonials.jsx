import Image from 'next/image';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';
import { MotionViewport } from 'src/components/animate';
import {
  Carousel,
  useCarousel,
  CarouselDotButtons,
  carouselBreakpoints,
  CarouselArrowBasicButtons,
} from 'src/components/carousel';

import { SectionTitle } from './components/section-title';

// ----------------------------------------------------------------------

export function HomeTestimonials({ sx, ...other }) {
  const [loading, setLoading] = useState(false);

  function ff() {
    try {
      router.replace('/auth/jwt/sign-in/');
      setLoading(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  const router = useRouter();
  const carousel = useCarousel({
    align: 'start',
    slidesToShow: { xs: 1, sm: 2, md: 3, lg: 4 },
    breakpoints: {
      [carouselBreakpoints.sm]: { slideSpacing: '24px' },
      [carouselBreakpoints.md]: { slideSpacing: '40px' },
      [carouselBreakpoints.lg]: { slideSpacing: '64px' },
    },
  });

  const renderContent = (
    <Stack sx={{ position: 'relative', py: 1, height: 500 }}>
      <Divider sx={{ borderStyle: 'dashed' }} />
      <Carousel carousel={carousel} sx={{ p: 1, height: 500, width: '100%' }}>
        {TESTIMONIALS.map((item) => (
          <Stack
            key={item.id}
            sx={{
              height: 500,
              px: 2,
              py: 1,
              direction: 'rtl',
            }}
          >
            <Typography variant="h6" sx={{ textAlign: 'left', fontWeight: 800, lineHeight: 1.5 }}>
              {item.title}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mt: 1,
                textAlign: 'left',
                color: 'text.secondary',
                lineHeight: 1.8,
              }}
            >
              {item.description}
            </Typography>

            <Box
              sx={{
                bgcolor: 'transparent',
                mt: 2,
                position: 'relative',
                height: 300,
                borderRadius: 2,
              }}
              maxWidth
            >
              <Image
                src={`/assets/images/product/${item.image}`}
                alt={item.title || 'slide'}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 900px) 100vw, 900px"
                priority={item.id === 1}
              />
              {item.id === 2 && (
                <LoadingButton
                  loadingIndicator="ادامه..."
                  loading={loading}
                  // component={RouterLink}
                  type="button"
                  variant="contained"
                  onClick={() => ff()}
                  startIcon={<Iconify width={18} icon="eva:arrow-ios-back-fill" sx={{ ml: 1 }} />}
                  sx={{
                    position: 'absolute',
                    bottom: -38,
                    left: 121,
                    pl: 3,
                  }}
                >
                  ادامه
                </LoadingButton>
              )}
            </Box>
          </Stack>
        ))}
      </Carousel>

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <CarouselArrowBasicButtons {...carousel.arrows} options={carousel.options} />
        <CarouselDotButtons
          fallback
          variant="rounded"
          scrollSnaps={carousel.dots.scrollSnaps}
          selectedIndex={carousel.dots.selectedIndex}
          onClickDot={carousel.dots.onClickDot}
        />
      </Stack>
    </Stack>
  );

  return (
    <Stack component="section" sx={{ py: 2, position: 'relative', ...sx }} {...other}>
      <MotionViewport>
        <Container>
          <SectionTitle caption="خوش‌آمدید!" sx={{ textAlign: 'center' }} />
          {renderContent}
        </Container>
      </MotionViewport>
    </Stack>
  );
}

// ----------------------------------------------------------------------

const TESTIMONIALS = [
  {
    id: 1,
    title: 'خرید اقساطی بدون چک و ضامن',
    description:
      'بدون نیاز به چک، ضامن یا مدارک پیچیده، همین حالا خریدت رو به‌صورت اقساطی انجام بده.',
    image: 'landing1.png',
  },
  {
    id: 2,
    title: 'پرداخت اقساط با کسر مستقیم از حقوق',
    description: 'نظم مالی بیشتر، فراموشی کمتر، آسایش بیشتر',
    image: 'landing2.png',
  },
];
