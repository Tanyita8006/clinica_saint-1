import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Chip,
} from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import InfoIcon from '@mui/icons-material/Info';

export default function Observacion() {
  const [observacion, setObservacion] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [caracteresRestantes, setCaracteresRestantes] = useState(500);

  const maxCaracteres = 500;

  const handleObservacionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const texto = event.target.value;
    
    if (texto.length <= maxCaracteres) {
      setObservacion(texto);
      setCaracteresRestantes(maxCaracteres - texto.length);
      
      // Limpiar mensajes cuando el usuario empiece a escribir
      if (errorMessage || successMessage) {
        setErrorMessage('');
        setSuccessMessage('');
      }
    }
  };

  const handleGuardar = () => {
    if (observacion.trim().length === 0) {
      setErrorMessage('La observación no puede estar vacía');
      return;
    }

    if (observacion.trim().length < 10) {
      setErrorMessage('La observación debe tener al menos 10 caracteres');
      return;
    }

    console.log('Observación guardada:', observacion);
    setSuccessMessage('Observación guardada correctamente');
    
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleLimpiar = () => {
    setObservacion('');
    setCaracteresRestantes(maxCaracteres);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const getContadorColor = () => {
    if (caracteresRestantes < 50) return 'error';
    if (caracteresRestantes < 100) return 'warning';
    return 'success';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h6"
        sx={{
          color: '#1A3C6D',
          fontWeight: 'bold',
          mb: 3,
          textAlign: 'left',
        }}
      >
        OBSERVACIONES
      </Typography>

      {/* Alertas */}
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2, fontSize: 12 }}>
          {errorMessage}
        </Alert>
      )}

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2, fontSize: 12 }}>
          {successMessage}
        </Alert>
      )}

      <Paper elevation={2} sx={{ p: 3 }}>

        {/* Campo de observación */}
        <TextField
          label="OBSERVACIÓN"
          multiline
          rows={8}
          fullWidth
          value={observacion}
          onChange={handleObservacionChange}
          placeholder="Escriba aquí sus observaciones..."
          variant="outlined"
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              fontSize: 14,
              '& fieldset': {
                borderColor: observacion.length > 0 ? '#4CAF50' : '#E0E0E0',
                borderWidth: observacion.length > 0 ? 2 : 1,
              },
              '&:hover fieldset': {
                borderColor: '#2196F3',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#1976D2',
                borderWidth: 2,
              },
            },
            '& .MuiInputLabel-root': {
              fontSize: 14,
              fontWeight: 'bold',
              color: '#1A3C6D',
            },
          }}
        />

        {/* Contador de caracteres y estadísticas */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3,
          flexWrap: 'wrap',
          gap: 1
        }}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip
              label={`${observacion.length}/${maxCaracteres} caracteres`}
              color={getContadorColor()}
              size="small"
              variant="outlined"
            />
            <Chip
              label={`${observacion.split(' ').filter(word => word.length > 0).length} palabras`}
              color="info"
              size="small"
              variant="outlined"
            />
            <Chip
              label={`${observacion.split('\n').length} líneas`}
              color="default"
              size="small"
              variant="outlined"
            />
          </Box>

          {caracteresRestantes < 100 && (
            <Typography 
              variant="caption" 
              sx={{ 
                color: caracteresRestantes < 50 ? '#f44336' : '#ff9800',
                fontWeight: 'bold'
              }}
            >
              {caracteresRestantes} caracteres restantes
            </Typography>
          )}
        </Box>

        {/* Botones */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGuardar}
            disabled={observacion.trim().length === 0}
            sx={{ fontWeight: 'bold', minWidth: 120 }}
            startIcon={<SaveIcon />}
          >
            GUARDAR
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleLimpiar}
            disabled={observacion.length === 0}
            sx={{ fontWeight: 'bold', minWidth: 120 }}
            startIcon={<ClearIcon />}
          >
            LIMPIAR
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}