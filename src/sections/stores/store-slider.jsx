import Autoplay from 'embla-carousel-autoplay';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';

import { Image } from 'src/components/image';
import { Carousel, useCarousel, CarouselDotButtons } from 'src/components/carousel';

// ----------------------------------------------------------------------

export function StoreSlider({ list, sx, ...other }) {
  const carousel = useCarousel({ loop: true }, [Autoplay({ playOnInit: true, delay: 3000 })]);

  return (
    <Card sx={{ bgcolor: 'common.black', ...sx }} {...other}>
      <CarouselDotButtons
        scrollSnaps={carousel.dots.scrollSnaps}
        selectedIndex={carousel.dots.selectedIndex}
        onClickDot={carousel.dots.onClickDot}
        sx={{ right: 165, bottom: 20, position: 'absolute', color: 'primary.light' }}
      />

      <Carousel carousel={carousel}>
        {list.map((item) => (
          <CarouselItem key={item.id} item={item} />
        ))}
      </Carousel>
    </Card>
  );
}

// ----------------------------------------------------------------------

function CarouselItem({ item, ...other }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: 1,
        height: 210,
        position: 'relative',
        overflow: 'hidden',
        ...other,
      }}
    >
      {/* <Box
        sx={{
          p: 3,
          left: 0,
          width: 1,
          bottom: 0,
          zIndex: 9,
          display: 'flex',
          position: 'absolute',
          color: 'common.white',
          flexDirection: 'column',
        }}
      >
        <Typography variant="overline" sx={{ opacity: 0.48 }}>
          New
        </Typography>

        <Link color="inherit" underline="none" variant="h5" noWrap sx={{ mt: 1, mb: 3 }}>
          {item.name}
        </Link>

        <Button color="primary" variant="contained" sx={{ alignSelf: 'flex-start' }}>
          Buy now
        </Button>
      </Box> */}

      <Image
        alt={item.name}
        src={`/assets/images/storeSlider/${item.coverUrl}`}
        // slotProps={{
        //   overlay: {
        //     background: `linear-gradient(to bottom, ${varAlpha(
        //       theme.vars.palette.grey['900Channel'],
        //       0
        //     )} 0%, ${theme.vars.palette.grey[900]} 75%)`,
        //   },
        // }}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </Box>
  );
}
