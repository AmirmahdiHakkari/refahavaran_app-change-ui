import { toast } from 'sonner';
import { z as zod } from 'zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

 import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export const NewUserSchema = zod.object({
  email: zod.string().email({ message: 'ایمیل معتبر نیست!' }),
});

// ----------------------------------------------------------------------

export function ProfileNewEditForm({ currentUser }) {
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      // avatarUrl: currentUser?.avatarUrl || null,
      avatarUrl: null,
      email: currentUser?.email || '',
    }),
    [currentUser]
  );

  const methods = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      toast.success('تغییرات با موفقیت انجام شد!');
      router.push(paths.dashboard.profile.view);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Box container spacing={3}>
        <Grid sx={{ mb: 3 }}>
          <Card sx={{ pt: 3.5, px: 3 }}>
            <Box sx={{ mb: 5 }}>
              <Field.UploadAvatar
                name="avatarUrl"
                maxSize={3145728}
                helperText={
                  <>
                    <Typography
                      variant="h4"
                      sx={{
                        mt: 3,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: '-moz-initial',
                      }}
                    >
                      {/* {currentUser?.name} */}
                      امیرمهدی حکاری
                    </Typography>
                    <Typography
                      variant="inherit"
                      sx={{
                        mt: 3,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.secondary',
                      }}
                    >
                      09388738548
                    </Typography>
                  </>
                }
              />
            </Box>
          </Card>
        </Grid>

        <Grid>
          <Card sx={{ p: 3 }}>
            <Box rowGap={3} columnGap={2} display="grid" gridTemplateColumns="repeat(1, 1fr)">
              <Field.Text name="email" label="ایمیل" />
            </Box>

            <Stack alignItems="flex-start" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                ذخیره تغییرات
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Box>
    </Form>
  );
}
