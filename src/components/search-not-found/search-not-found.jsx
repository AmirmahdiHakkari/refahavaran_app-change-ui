import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export function SearchNotFound({ query, sx, ...other }) {
  if (!query) {
    return (
      <Typography variant="body2" sx={sx}>
        Please enter keywords
      </Typography>
    );
  }

  return (
    <Box sx={{ textAlign: 'center', borderRadius: 1.5, ...sx }} {...other}>
      <Box sx={{ mb: 1, typography: 'h6' }}>موردی یافت نشد</Box>

      <Typography
        variant="body2"
        dir="rtl"
        sx={{
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          overflowWrap: 'anywhere',
          '& strong': { wordBreak: 'break-word', overflowWrap: 'anywhere' },
        }}
      >
        هیچ نتیجه‌ای برای <strong>{`"${query}"`}</strong> پیدا نشد.
      </Typography>
    </Box>
  );
}
