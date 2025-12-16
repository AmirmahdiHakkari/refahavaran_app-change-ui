'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { SearchNotFound } from 'src/components/search-not-found';
import { SearchScrollbar } from 'src/components/search-scrollbar';

import { StoreTitle } from '../store-title';
import { StoreSearchItem } from '../store-search-item';

const searchMock = [
  {
    id: 1,
    name: 'ماشین لباس‌شویی',
  },
  {
    id: 2,
    name: 'مک‌ بوک پرو',
  },
  {
    id: 3,
    name: 'موس بیسیم',
  },
];
const searchMock2 = [
  {
    id: 1,
    name: 'موبایل',
  },
  {
    id: 2,
    name: 'لپ‌تاپ',
  },
  {
    id: 3,
    name: 'یخچال',
  },
  {
    id: 4,
    name: 'ساعت',
  },
  {
    id: 5,
    name: 'کیف زنانه',
  },
  {
    id: 6,
    name: 'سرخ کن',
  },
];

export function StoresSearchView() {
  const router = useRouter();
  const sp = useSearchParams();

  const initialQ = sp.get('q') || '';
  const [query, setQuery] = useState(initialQ);
  const [results, setResults] = useState([]);

  const composingRef = useRef(false);

  useEffect(() => {
    // sync با URL در صورتی که از بیرون عوض شد
    setQuery(initialQ);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQ]);

  useEffect(() => {
    let active = true;
    const timer = setTimeout(() => {
      if (!active) return;

      // TODO: اینجا API واقعی جست‌وجو رو صدا بزن (SWR/React Query توصیه می‌شه)
      const fake = ['نارون', 'جین‌وست', 'رئوف گالری', 'وحدت', 'چرم دیدو'].filter((x) =>
        x.includes(query)
      );
      setResults(fake);
    }, 250);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [query]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (composingRef.current) return;
    const next = new URLSearchParams(sp.toString());
    if (query.trim()) next.set('q', query.trim());
    else next.delete('q');
    router.replace(`/dashboard/stores/search?${next.toString()}`);
  };

  const hasQuery = query.trim().length > 0;

  return (
    <DashboardContent>
      <Stack spacing={2}>
        <Box component="form" onSubmit={onSubmit}>
          <TextField
            autoFocus
            fullWidth
            label="جست‌وجو در فروشگاه‌ها..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onCompositionStart={() => {
              composingRef.current = true;
            }}
            onCompositionEnd={() => {
              composingRef.current = false;
            }}
            variant="outlined"
            size="medium"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {hasQuery ? (
                    <IconButton
                      aria-label="clear"
                      onClick={() => setQuery('')}
                      edge="end"
                      size="small"
                    >
                      <Iconify icon="solar:close-circle-bold" />
                    </IconButton>
                  ) : (
                    <InputAdornment position="end">
                      <Iconify icon="mdi:magnify" width={22} />
                    </InputAdornment>
                  )}
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {hasQuery ? (
          results.length ? (
            <List sx={{ mt: 1, py: 0 }}>
              {results.map((name) => (
                <ListItem key={name} disablePadding divider>
                  <ListItemButton
                    // onClick={() => router.push(`/dashboard/stores/${encodeURIComponent(name)}`)}
                    sx={{
                      py: 1.25,
                      px: 1.5,
                      borderRadius: 1.5,
                      '&:hover': {
                        bgcolor: (t) =>
                          t.palette.mode === 'light' ? 'action.hover' : 'rgba(255,255,255,0.04)',
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 28, color: 'text.secondary' }}>
                      <Iconify icon="mdi:magnify" width={22} />
                    </ListItemIcon>

                    <ListItemText
                      primary={name}
                      primaryTypographyProps={{
                        variant: 'body2',
                        sx: {
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        },
                      }}
                    />

                    <Iconify
                      icon="solar:alt-arrow-left-linear"
                      width={18}
                      style={{ opacity: 0.6 }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          ) : (
            <>
              <List sx={{ mt: 1, py: 0 }}>
                <ListItem disablePadding divider>
                  <ListItemButton
                    // onClick={() => router.push(`/dashboard/stores/${encodeURIComponent(name)}`)}
                    sx={{
                      py: 1.25,
                      px: 1.5,
                      borderRadius: 1.5,
                      '&:hover': {
                        bgcolor: (t) =>
                          t.palette.mode === 'light' ? 'action.hover' : 'rgba(255,255,255,0.04)',
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 28, color: 'text.secondary' }}>
                      <Iconify icon="mdi:magnify" width={22} />
                    </ListItemIcon>

                    <ListItemText
                      primary={query}
                      primaryTypographyProps={{
                        variant: 'body2',
                        sx: {
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        },
                      }}
                    />

                    <Iconify
                      icon="solar:alt-arrow-left-linear"
                      width={18}
                      style={{ opacity: 0.6 }}
                    />
                  </ListItemButton>
                </ListItem>
              </List>
              <SearchNotFound sx={{ mt: 2 }} query={query} />
            </>
          )
        ) : (
          <>
            <StoreTitle title="جست‌وجوهای اخیر شما" icon="mdi:history" />
            <SearchScrollbar sx={{ mb: 3 }}>
              <Box sx={{ gap: 3, display: 'flex' }}>
                {searchMock.map((product) => (
                  <StoreSearchItem key={product.id} product={product} />
                ))}
              </Box>
            </SearchScrollbar>

            <StoreTitle title="جست‌وجوهای پرطرفدار" icon="mdi:fire" />
            <SearchScrollbar sx={{ mb: 3 }}>
              <Box sx={{ gap: 3, display: 'flex' }}>
                {searchMock2.map((product) => (
                  <StoreSearchItem key={product.id} product={product} />
                ))}
              </Box>
            </SearchScrollbar>
          </>
        )}
      </Stack>
    </DashboardContent>
  );
}
