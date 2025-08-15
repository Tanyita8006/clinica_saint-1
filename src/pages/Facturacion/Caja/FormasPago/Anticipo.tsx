import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemButton,
} from '@mui/material';

interface AnticipoData {
  id: number;
  noTarjeta: string;
  valorAbonado: number;
  fecha: string;
  paciente: string;
  usado: boolean;
  valorRestante: number;
  tipo: 'TARJETA' | 'EFECTIVO' | 'TRANSFERENCIA';
}

export default function Anticipo() {
  const [anticiposDisponibles, setAnticiposDisponibles] = useState<AnticipoData[]>([]);
  const [anticipoSeleccionado, setAnticipoSeleccionado] = useState<AnticipoData | null>(null);
  const [valorAplicar, setValorAplicar] = useState<number | ''>('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Estilos comunes
  const textFieldProps = {
    size: 'small' as const,
    fullWidth: true,
    InputProps: { style: { fontSize: 12, height: 35 } },
    InputLabelProps: { style: { fontSize: 12, fontWeight: 'bold' } },
  };

  // Simular la carga de anticipos disponibles del paciente actual
  useEffect(() => {
    // Datos precargados de anticipos realizados anteriormente
    const anticiposPaciente: AnticipoData[] = [
      {
        id: 1,
        noTarjeta: "****-****-****-1234",
        valorAbonado: 350.00,
        fecha: "15/07/2025",
        paciente: "JUAN PÉREZ",
        usado: false,
        valorRestante: 350.00,
        tipo: 'TARJETA',
      },
      {
        id: 2,
        noTarjeta: "EFECTIVO",
        valorAbonado: 500.00,
        fecha: "20/07/2025",
        paciente: "JUAN PÉREZ",
        usado: false,
        valorRestante: 200.00,
        tipo: 'EFECTIVO',
      },
      {
        id: 3,
        noTarjeta: "TRANSFERENCIA BCO-001",
        valorAbonado: 750.00,
        fecha: "25/07/2025",
        paciente: "JUAN PÉREZ",
        usado: false,
        valorRestante: 750.00,
        tipo: 'TRANSFERENCIA',
      },
    ];

    // Filtrar solo anticipos con valor restante > 0
    const anticiposActivos = anticiposPaciente.filter(a => a.valorRestante > 0 && !a.usado);
    setAnticiposDisponibles(anticiposActivos);
  }, []);

  const handleSeleccionarAnticipo = (anticipo: AnticipoData) => {
    setAnticipoSeleccionado(anticipo);
    setValorAplicar('');
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleValorAplicarChange = (valor: string) => {
    const numericValue = Number(valor);
    
    if (anticipoSeleccionado && numericValue > anticipoSeleccionado.valorRestante) {
      setErrorMessage(`El valor no puede ser mayor al saldo disponible ($${anticipoSeleccionado.valorRestante})`);
    } else {
      setErrorMessage('');
    }
    
    setValorAplicar(numericValue || '');
  };

  const handleRegistrar = () => {
    if (!anticipoSeleccionado) {
      setErrorMessage('Debe seleccionar un anticipo');
      return;
    }

    if (!valorAplicar || valorAplicar <= 0) {
      setErrorMessage('El valor a aplicar debe ser mayor a 0');
      return;
    }

    if (valorAplicar > anticipoSeleccionado.valorRestante) {
      setErrorMessage(`El valor no puede ser mayor al saldo disponible ($${anticipoSeleccionado.valorRestante})`);
      return;
    }

    // Aplicar el anticipo
    console.log('Anticipo aplicado:', {
      anticipoId: anticipoSeleccionado.id,
      valorAplicado: valorAplicar,
      tipo: anticipoSeleccionado.tipo,
      referencia: anticipoSeleccionado.noTarjeta,
    });

    // Actualizar el valor restante del anticipo
    const nuevoValorRestante = anticipoSeleccionado.valorRestante - valorAplicar;
    
    setAnticiposDisponibles(prev => 
      prev.map(anticipo => 
        anticipo.id === anticipoSeleccionado.id 
          ? { ...anticipo, valorRestante: nuevoValorRestante, usado: nuevoValorRestante === 0 }
          : anticipo
      ).filter(a => a.valorRestante > 0)
    );

    setSuccessMessage(`Anticipo de $${valorAplicar} aplicado correctamente`);
    setAnticipoSeleccionado(null);
    setValorAplicar('');
    
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleCancelar = () => {
    setAnticipoSeleccionado(null);
    setValorAplicar('');
    setErrorMessage('');
    setSuccessMessage('');
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'TARJETA': return 'primary';
      case 'EFECTIVO': return 'success';
      case 'TRANSFERENCIA': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        border: '2px solid #4A90E2',
        borderRadius: 2,
        maxWidth: 600,
        mx: 'auto',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: '#1A3C6D',
          fontWeight: 'bold',
          mb: 2,
          textAlign: 'center',
        }}
      >
        ABONOS PACIENTE
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

      {/* Info sobre anticipos */}
      <Alert severity="info" sx={{ mb: 2, fontSize: 11 }}>
        Se muestran automáticamente los anticipos realizados anteriormente por el paciente
      </Alert>

      {/* Lista de anticipos disponibles */}
      {anticiposDisponibles.length === 0 ? (
        <Alert severity="warning" sx={{ mb: 2, fontSize: 12 }}>
          No hay anticipos disponibles para este paciente
        </Alert>
      ) : (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
            ANTICIPOS DISPONIBLES ({anticiposDisponibles.length}):
          </Typography>
          <List sx={{ border: '1px solid #E0E0E0', borderRadius: 1, maxHeight: 250, overflow: 'auto' }}>
            {anticiposDisponibles.map((anticipo, index) => (
              <React.Fragment key={anticipo.id}>
                <ListItemButton
                  onClick={() => handleSeleccionarAnticipo(anticipo)}
                  selected={anticipoSeleccionado?.id === anticipo.id}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: '#E3F2FD',
                    }
                  }}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          ID: {anticipo.id} - {anticipo.noTarjeta}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Chip 
                            label={anticipo.tipo} 
                            size="small" 
                            color={getTipoColor(anticipo.tipo)}
                            variant="outlined"
                          />
                          <Chip 
                            label={`$${anticipo.valorRestante}`} 
                            size="small" 
                            color="primary" 
                          />
                        </Box>
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="caption" sx={{ display: 'block' }}>
                          📅 Fecha: {anticipo.fecha} | 💰 Valor Original: ${anticipo.valorAbonado}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'green', fontWeight: 'bold' }}>
                          💳 Saldo Disponible: ${anticipo.valorRestante}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItemButton>
                {index < anticiposDisponibles.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Box>
      )}

      {/* Detalles del anticipo seleccionado */}
      {anticipoSeleccionado && (
        <Box sx={{ mb: 3, p: 2, backgroundColor: '#F8F9FA', border: '1px solid #DEE2E6', borderRadius: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2, color: '#495057' }}>
            DETALLE DEL ANTICIPO SELECCIONADO:
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="N° DE TARJETA / REFERENCIA"
              value={anticipoSeleccionado.noTarjeta}
              disabled
              {...textFieldProps}
            />
            <TextField
              label="VALOR ABONADO"
              value={`$${anticipoSeleccionado.valorAbonado.toFixed(2)}`}
              disabled
              {...textFieldProps}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="TIPO"
                value={anticipoSeleccionado.tipo}
                disabled
                sx={{ flexBasis: '50%' }}
                {...textFieldProps}
              />
              <TextField
                label="FECHA"
                value={anticipoSeleccionado.fecha}
                disabled
                sx={{ flexBasis: '50%' }}
                {...textFieldProps}
              />
            </Box>
          </Box>
        </Box>
      )}

      {/* Campo para valor a aplicar */}
      {anticipoSeleccionado && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
          <TextField
            label="VALOR A USAR"
            type="number"
            value={valorAplicar}
            onChange={(e) => handleValorAplicarChange(e.target.value)}
            placeholder="0.00"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#FFF9C4', // Color amarillo como en la imagen
                '&.Mui-focused': {
                  backgroundColor: '#FFF9C4',
                }
              }
            }}
            size="small"
            fullWidth
            InputProps={{ style: { fontSize: 12, height: 35 } }}
            InputLabelProps={{ style: { fontSize: 12, fontWeight: 'bold' } }}
            helperText={`💰 Saldo disponible: $${anticipoSeleccionado.valorRestante.toFixed(2)}`}
            inputProps={{
              min: 0,
              max: anticipoSeleccionado.valorRestante,
              step: 0.01,
            }}
          />
        </Box>
      )}

      
    </Paper>
  );
}