'use client';

import Image from 'next/image';

import { Box, Stack } from '@mui/material';

import { Scrollbar } from 'src/components/scrollbar';

import { StoreItem } from './store-item';
import { StoreTitle } from './store-title';
import { StoreSlider } from './store-slider';
import { StoreRecentItem } from './store-recent-item';
import { StoreCategoryItem } from './store-category-item';

// ----------------------------------------------------------------------

const DEFAULT_CATEGORIES = [
  { id: 'consumables', title: 'کالاهای مصرفی', icon: 'consumerGoods.png', color: '#faaf7194' },
  { id: 'digital', title: 'کالاهای دیجیتال', icon: 'digitalGoods.png', color: '#6daeffc7' },
  { id: 'apparel', title: 'پوشاک و اکسسوری', icon: 'clothing.png', color: '#ffa3d3e8' },
  { id: 'health', title: 'پزشکی و سلامت', icon: 'medicine.png', color: '#34d39991' },
  { id: 'home', title: 'لوازم خانگی', icon: 'householdAppliances.png', color: '#baa4fd' },
  { id: 'travel', title: 'گردشگری', icon: 'tourism.png', color: '#ffc057d1' },
  { id: 'insurance', title: 'بیمه', icon: 'insurance.png', color: '#06b6d487' },
  { id: 'sports', title: 'لوازم ورزشی', icon: 'varzesh.png', color: '#EF4444' },
];
const DEFAULT_PRODUCT_SLIDER = [
  {
    id: 1,
    name: '',
    coverUrl: 'item1.webp',
  },
  {
    id: 2,
    name: '',
    coverUrl: 'item2.webp',
  },
  {
    id: 3,
    name: '',
    coverUrl: 'item3.webp',
  },
  {
    id: 4,
    name: '',
    coverUrl: 'item4.webp',
  },
];
const NEW_PRODUCTS = [
  {
    name: 'دیویدجونز',
    coverURL: 'D&J.webp',
    type: 'آنلاین و حضوری',
    category: 'مد و پوشاک',
  },
  {
    name: 'ساعت آرام',
    coverURL: 'watch.png',
    type: 'حضوری',
    category: 'مد و پوشاک',
  },
  {
    name: 'چرم دیدو',
    coverURL: 'dido.png',
    type: 'آنلاین و حضوری',
    category: 'مد و پوشاک',
  },
];
const CLOTH_PRODUCTS = [
  {
    name: 'جین‌وست',
    coverURL: 'jinwest.webp',
    type: 'آنلاین و حضوری',
    category: 'مد و پوشاک',
  },
  {
    name: 'دیویدجونز',
    coverURL: 'D&J.webp',
    type: 'آنلاین و حضوری',
    category: 'مد و پوشاک',
  },
  {
    name: 'رئوف گالری',
    coverURL: 'raoof.webp',
    type: 'آنلاین و حضوری',
    category: 'مد و پوشاک',
  },
  {
    name: 'چرم دیدو',
    coverURL: 'dido.png',
    type: 'آنلاین و حضوری',
    category: 'مد و پوشاک',
  },
  {
    name: 'وحدت',
    coverURL: 'vahdat.webp',
    type: 'آنلاین و حضوری',
    category: 'مد و پوشاک',
  },
];
const HOME_PRODUCTS = [
  {
    name: 'لوازم خانگی صدرا',
    coverURL: 'sadra.webp',
    category: 'لوازم خانگی',
  },
  {
    name: 'فرش محتشم',
    coverURL: 'mohtasham.webp',
    category: 'لوازم خانگی',
  },
  {
    name: 'فرش بهشتی',
    coverURL: 'beheshti.webp',
    category: 'لوازم خانگی',
  },
  {
    name: 'هایپر کالای ایوان',
    coverURL: 'ayvan.webp',
    category: 'لوازم خانگی',
  },
  {
    name: 'کلور',
    coverURL: 'clever.webp',
    category: 'لوازم خانگی',
  },
];
const CONSUMER_PRODUCTS = [
  {
    name: 'فروشگاه هفت',
    coverURL: 'haft.webp',
    category: 'لوازم مصرفی',
  },
  {
    name: 'شیرینی و آجیل قیطریه',
    coverURL: 'shirini.webp',
    category: 'لوازم مصرفی',
  },
  {
    name: 'پروتئین لند',
    coverURL: 'potein.webp',
    category: 'لوازم مصرفی',
  },
];
const DEFAULT_PRODUCT_SLIDER2 = [
  {
    id: 1,
    name: '',
    coverUrl: 'slider21.webp',
  },
  {
    id: 2,
    name: '',
    coverUrl: 'slider22.webp',
  },
];
const CONSUMER_PRODUCTS2 = [
  {
    name: 'سام تجارت',
    coverURL: 'samtegart.webp',
    category: 'لوازم الکترونیکی',
  },
  {
    name: 'دیجی‌لند',
    coverURL: 'digiland.webp',
    category: 'لوازم الکترونیکی',
  },
  {
    name: 'هایپر کالای ایوان',
    coverURL: 'ayvan.webp',
    category: 'لوازم خانگی',
  },
  {
    name: 'به روزدیجی',
    coverURL: 'berozdigi.webp',
    category: 'لوازم خانگی',
  },
];
const PRODUCTS = [
  {
    name: 'سام تجارت',
    coverURL: 'samtegart.webp',
    category: 'لوازم الکترونیکی',
  },
  {
    name: 'فروشگاه هفت',
    coverURL: 'haft.webp',
    category: 'لوازم مصرفی',
  },
  {
    name: 'دیجی‌لند',
    coverURL: 'digiland.webp',
    category: 'لوازم الکترونیکی',
  },
  {
    name: 'هایپر کالای ایوان',
    coverURL: 'ayvan.webp',
    category: 'لوازم خانگی',
  },
  {
    name: 'به روزدیجی',
    coverURL: 'berozdigi.webp',
    category: 'لوازم خانگی',
  },

  {
    name: 'شیرینی و آجیل قیطریه',
    coverURL: 'shirini.webp',
    category: 'لوازم مصرفی',
  },
  {
    name: 'پروتئین لند',
    coverURL: 'potein.webp',
    category: 'لوازم مصرفی',
  },
  {
    name: 'جین‌وست',
    coverURL: 'jinwest.webp',
    type: 'آنلاین و حضوری',
    category: 'مد و پوشاک',
  },
];

// ----------------------------------------------------------------------

export function StoreInPersonTab() {
  return (
    <>
      <StoreTitle title="دسته‌بندی‌ها" sx={{ mb: 3 }} />
      <Scrollbar sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {DEFAULT_CATEGORIES.map((category) => (
            <StoreCategoryItem key={category.id} category={category} />
          ))}
        </Box>
      </Scrollbar>
      {/*  */}
      <Stack>
        <StoreSlider list={DEFAULT_PRODUCT_SLIDER} />
      </Stack>
      {/*  */}
      <Box sx={{ mt: 5 }}>
        <StoreTitle title="جدیدترین فروشگاه‌ها" link="#" sx={{ mb: 3 }} />
        <Scrollbar sx={{ mb: 3, minHeight: 186 }}>
          <Box sx={{ gap: 3, display: 'flex' }}>
            {NEW_PRODUCTS.map((product) => (
              <StoreItem key={product.id} product={product} />
            ))}
          </Box>
        </Scrollbar>
        {/*  */}
        <StoreTitle title="مد و پوشاک" link="#" sx={{ mb: 3 }} />
        <Scrollbar sx={{ mb: 3, minHeight: 186 }}>
          <Box sx={{ gap: 3, display: 'flex' }}>
            {CLOTH_PRODUCTS.map((product) => (
              <StoreItem key={product.id} product={product} />
            ))}
          </Box>
        </Scrollbar>
        {/*  */}
        <Box
          sx={{
            mb: 5,
            display: 'grid',
            gap: 2,
            gridTemplateColumns: '1fr 1fr',
            alignItems: 'stretch',
            '@media (max-width:375px)': { gridTemplateColumns: '1fr' },
          }}
        >
          <Box
            sx={{
              height: 140,
              position: 'relative',
              p: 0,
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <Image
              src="/assets/images/product/box1.png"
              alt="box1"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              sizes="(max-width: 375px) 100vw, 50vw"
              priority
            />
          </Box>

          <Box
            sx={{ height: 140, position: 'relative', p: 0, borderRadius: 2, overflow: 'hidden' }}
          >
            <Image
              src="/assets/images/product/box2.png"
              alt="box2"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              sizes="(max-width: 375px) 100vw, 50vw"
            />
          </Box>

          <Box
            sx={{
              height: 180,
              position: 'relative',
              p: 0,
              borderRadius: 2,
              overflow: 'hidden',
              gridColumn: '1 / -1',
            }}
          >
            <Image
              src="/assets/images/product/box3.png"
              alt="box3"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              sizes="100vw"
            />
          </Box>
        </Box>
        {/*  */}
        <StoreTitle title="کالای خانگی" link="#" sx={{ mb: 3 }} />
        <Scrollbar sx={{ mb: 3, minHeight: 186 }}>
          <Box sx={{ gap: 3, display: 'flex' }}>
            {HOME_PRODUCTS.map((product) => (
              <StoreItem key={product.id} product={product} />
            ))}
          </Box>
        </Scrollbar>
        {/*  */}
        <StoreTitle title="کالای مصرفی" link="#" sx={{ mb: 3 }} />
        <Scrollbar sx={{ mb: 3, minHeight: 186 }}>
          <Box sx={{ gap: 3, display: 'flex' }}>
            {CONSUMER_PRODUCTS.map((product) => (
              <StoreItem key={product.id} product={product} />
            ))}
          </Box>
        </Scrollbar>
        {/*  */}
        <Stack sx={{ mb: 5 }}>
          <StoreSlider list={DEFAULT_PRODUCT_SLIDER2} />
        </Stack>
        {/*  */}
        <StoreTitle title="کالای دیجیتال" link="#" sx={{ mb: 3 }} />
        <Scrollbar sx={{ mb: 3, minHeight: 186 }}>
          <Box sx={{ gap: 3, display: 'flex' }}>
            {CONSUMER_PRODUCTS2.map((product) => (
              <StoreItem key={product.id} product={product} />
            ))}
          </Box>
        </Scrollbar>
        {/*  */}
        <StoreTitle title="فروشگاه‌های محبوب" link="#" sx={{ mb: 3 }} />
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            alignItems: 'stretch',
            justifyItems: 'stretch',
            '@media (max-width:350px)': {
              gridTemplateColumns: '1fr',
            },
          }}
        >
          {PRODUCTS.map((product) => (
            <StoreRecentItem key={product.id} product={product} />
          ))}
        </Box>
      </Box>
    </>
  );
}
