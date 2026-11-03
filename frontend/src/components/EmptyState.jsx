import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";

export default function EmptyState({ icon: Icon, title, description, actionText, onAction }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 4, sm: 6 },
        textAlign: "center",
        borderRadius: 4,
        border: "2px dashed",
        borderColor: "divider",
        bgcolor: "background.paper",
        my: 3,
      }}
    >
      {Icon && (
        <Box
          sx={{
            display: "inline-flex",
            p: 2,
            borderRadius: "50%",
            bgcolor: "action.hover",
            color: "primary.main",
            mb: 2,
          }}
        >
          <Icon sx={{ fontSize: 44 }} />
        </Box>
      )}
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 450, mx: "auto", mb: 3 }}>
        {description}
      </Typography>
      {actionText && onAction && (
        <Button variant="contained" color="primary" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </Paper>
  );
}
