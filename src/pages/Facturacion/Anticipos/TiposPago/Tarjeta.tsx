import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
  Alert,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PaymentIcon from '@mui/icons-material/Payment';

interface TarjetaData {
  valor: number;
  banco: string;
  emisor: string;
  numeroTarjeta: string;
  numeroAprobacion: string;
  tipoPago: 'CORRIENTE' | 'DIFERIDO';
  plazo: number;
  lote: string;
  referencia: string;
}

export default function Tarjeta() {
  const [tarjetaData, setTarjetaData] = useState<TarjetaData>({
    valor: 0,
    banco: '',
    emisor: '',
    numeroTarjeta: '',
    numeroAprobacion: '',
    tipoPago: 'CORRIENTE',
    plazo: 0,
    lote: '',
    referencia: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Lista de bancos disponibles
  const bancos = [
    'BANCO PICHINCHA',
    'BANCO DEL PACIFICO',
    'BANCO DE GUAYAQUIL',
    'PRODUBANCO',
    'BANCO BOLIVARIANO',
    'BANCO INTERNACIONAL',
    'CITIBANK',
    'BANCO DEL AUSTRO',
    'BANCO SOLIDARIO',
    'BANCO MACHALA',
    'BANCO PROCREDIT',
    'COOPERATIVA JUVENTUD ECUATORIANA',
    'MUTUALISTA PICHINCHA',
  ];

  // Lista de emisores (procesadores de tarjetas)
  const emisores = [
    'VISA',
    'MASTERCARD',
    'AMERICAN EXPRESS',
    'DINERS CLUB',
    'DISCOVER',
    'DATAFAST',
    'PAYCLUB',
    'CREDIMATIC',
  ];

  // Estilos comunes
  const textFieldProps = {
    size: 'small' as const,
    fullWidth: true,
    InputProps: { style: { fontSize: 12, height: 35 } },
    InputLabelProps: { style: { fontSize: 12, fontWeight: 'bold' } },
  };

  const selectProps = {
    size: 'small' as const,
    fullWidth: true,
    sx: { fontSize: 12, height: 35, minHeight: 35 },
    MenuProps: { PaperProps: { style: { fontSize: 12 } } },
  };

  const handleInputChange = (field: keyof TarjetaData, value: any) => {
    setTarjetaData(prev => ({
      ...prev,
      [field]: value
    }));

    // Limpiar mensajes cuando el usuario empiece a escribir
    if (errorMessage || successMessage) {
      setErrorMessage('');
      setSuccessMessage('');
    }
  };

  // Formatear número de tarjeta (mostrar solo últimos 4 dígitos)
  const formatearNumeroTarjeta = (numero: string) => {
    if (numero.length > 4) {
      return `****-****-****-${numero.slice(-4)}`;
    }
    return numero;
  };

  const validarDatos = () => {
    if (!tarjetaData.valor || tarjetaData.valor <= 0) {
      setErrorMessage('El valor debe ser mayor a 0');
      return false;
    }

    if (!tarjetaData.banco) {
      setErrorMessage('Debe seleccionar un banco');
      return false;
    }

    if (!tarjetaData.emisor) {
      setErrorMessage('Debe seleccionar un emisor');
      return false;
    }

    if (!tarjetaData.numeroTarjeta || tarjetaData.numeroTarjeta.length < 4) {
      setErrorMessage('El número de tarjeta debe tener al menos 4 dígitos');
      return false;
    }

    if (!tarjetaData.numeroAprobacion) {
      setErrorMessage('El número de aprobación es obligatorio');
      return false;
    }

    if (tarjetaData.tipoPago === 'DIFERIDO' && (!tarjetaData.plazo || tarjetaData.plazo <= 0)) {
      setErrorMessage('Para pagos diferidos, el plazo debe ser mayor a 0');
      return false;
    }

    if (!tarjetaData.lote) {
      setErrorMessage('El número de lote es obligatorio');
      return false;
    }

    if (!tarjetaData.referencia) {
      setErrorMessage('La referencia es obligatoria');
      return false;
    }

    return true;
  };

  const handleRegistrar = () => {
    if (!validarDatos()) {
      return;
    }

    console.log('Pago con tarjeta registrado:', tarjetaData);
    setSuccessMessage(`Pago con tarjeta de $${tarjetaData.valor} registrado correctamente`);
    
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleCerrar = () => {
    setTarjetaData({
      valor: 0,
      banco: '',
      emisor: '',
      numeroTarjeta: '',
      numeroAprobacion: '',
      tipoPago: 'CORRIENTE',
      plazo: 0,
      lote: '',
      referencia: '',
    });
    setErrorMessage('');
    setSuccessMessage('');
  };

  const getTipoPagoColor = (tipo: string) => {
    return tipo === 'CORRIENTE' ? 'success' : 'warning';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h6"
        sx={{
          color: '#1A3C6D',
          fontWeight: 'bold',
          mb: 3,
          textAlign: 'center',
        }}
      >
        <CreditCardIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        DETALLE DE LA TARJETA
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
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {/* Columna Izquierda */}
          <Box sx={{ flex: '1 1 45%', minWidth: '300px' }}>
            {/* Valor */}
            <Box sx={{ mb: 3 }}>
              <TextField
                label="VALOR *"
                type="number"
                value={tarjetaData.valor || ''}
                onChange={(e) => handleInputChange('valor', parseFloat(e.target.value) || 0)}
                {...textFieldProps}
                InputProps={{
                  ...textFieldProps.InputProps,
                  startAdornment: <PaymentIcon sx={{ mr: 1, fontSize: 16, color: '#4CAF50' }} />,
                  style: {
                    ...textFieldProps.InputProps.style,
                    backgroundColor: '#F0F8FF',
                    fontWeight: 'bold',
                  }
                }}
              />
            </Box>

            {/* Banco */}
            <Box sx={{ mb: 3 }}>
              <FormControl {...selectProps}>
                <InputLabel sx={{ fontWeight: 'bold' }}>BANCO *</InputLabel>
                <Select
                  label="BANCO *"
                  value={tarjetaData.banco}
                  onChange={(e) => handleInputChange('banco', e.target.value)}
                  {...selectProps}
                  startAdornment={<AccountBalanceIcon sx={{ mr: 1, fontSize: 16, color: '#2196F3' }} />}
                >
                  {bancos.map((banco) => (
                    <MenuItem key={banco} value={banco}>
                      {banco}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Emisor */}
            <Box sx={{ mb: 3 }}>
              <FormControl {...selectProps}>
                <InputLabel sx={{ fontWeight: 'bold' }}>EMISOR *</InputLabel>
                <Select
                  label="EMISOR *"
                  value={tarjetaData.emisor}
                  onChange={(e) => handleInputChange('emisor', e.target.value)}
                  {...selectProps}
                >
                  {emisores.map((emisor) => (
                    <MenuItem key={emisor} value={emisor}>
                      {emisor}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Número de Tarjeta */}
            <Box sx={{ mb: 3 }}>
              <TextField
                label="N° TARJETA *"
                value={tarjetaData.numeroTarjeta}
                onChange={(e) => handleInputChange('numeroTarjeta', e.target.value)}
                {...textFieldProps}
                placeholder="Últimos 4 dígitos"
                helperText={tarjetaData.numeroTarjeta.length > 4 ? 
                  `Vista: ${formatearNumeroTarjeta(tarjetaData.numeroTarjeta)}` : 
                  'Ingrese los últimos 4 dígitos de la tarjeta'}
              />
            </Box>

            {/* Número de Aprobación */}
            <Box sx={{ mb: 3 }}>
              <TextField
                label="N° DE APROBACIÓN *"
                value={tarjetaData.numeroAprobacion}
                onChange={(e) => handleInputChange('numeroAprobacion', e.target.value)}
                {...textFieldProps}
              />
            </Box>
          </Box>

          {/* Columna Derecha */}
          <Box sx={{ flex: '1 1 45%', minWidth: '300px' }}>
            {/* Tipo de Pago */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                TIPO DE PAGO *:
              </Typography>
              <RadioGroup
                row
                value={tarjetaData.tipoPago}
                onChange={(e) => handleInputChange('tipoPago', e.target.value)}
              >
                <FormControlLabel 
                  value="CORRIENTE" 
                  control={<Radio />} 
                  label="CORRIENTE" 
                />
                <FormControlLabel 
                  value="DIFERIDO" 
                  control={<Radio />} 
                  label="DIFERIDO" 
                />
              </RadioGroup>
              <Chip
                label={tarjetaData.tipoPago}
                color={getTipoPagoColor(tarjetaData.tipoPago)}
                size="small"
                sx={{ mt: 1 }}
              />
            </Box>

            {/* Plazo (solo para diferido) */}
            {tarjetaData.tipoPago === 'DIFERIDO' && (
              <Box sx={{ mb: 3 }}>
                <TextField
                  label="PLAZO (MESES) *"
                  type="number"
                  value={tarjetaData.plazo || ''}
                  onChange={(e) => handleInputChange('plazo', parseInt(e.target.value) || 0)}
                  {...textFieldProps}
                  helperText="Número de cuotas para pago diferido"
                />
              </Box>
            )}

            {/* Lote */}
            <Box sx={{ mb: 3 }}>
              <TextField
                label="LOTE *"
                value={tarjetaData.lote}
                onChange={(e) => handleInputChange('lote', e.target.value)}
                {...textFieldProps}
              />
            </Box>

            {/* Referencia */}
            <Box sx={{ mb: 3 }}>
              <TextField
                label="REFERENCIA *"
                value={tarjetaData.referencia}
                onChange={(e) => handleInputChange('referencia', e.target.value)}
                {...textFieldProps}
              />
            </Box>
          </Box>
        </Box>

        {/* Resumen de la Transacción */}
        {tarjetaData.banco && tarjetaData.emisor && tarjetaData.valor > 0 && (
          <Paper elevation={1} sx={{ p: 2, mt: 3, backgroundColor: '#F5F5F5' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
              RESUMEN DE LA TRANSACCIÓN:
            </Typography>
            <Typography variant="caption" sx={{ display: 'block' }}>
              • Banco: {tarjetaData.banco}
            </Typography>
            <Typography variant="caption" sx={{ display: 'block' }}>
              • Emisor: {tarjetaData.emisor}
            </Typography>
            <Typography variant="caption" sx={{ display: 'block' }}>
              • Tarjeta: {formatearNumeroTarjeta(tarjetaData.numeroTarjeta)}
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', color: 'green', fontWeight: 'bold' }}>
              • Valor: ${tarjetaData.valor.toFixed(2)}
            </Typography>
            <Typography variant="caption" sx={{ display: 'block' }}>
              • Tipo: {tarjetaData.tipoPago}
              {tarjetaData.tipoPago === 'DIFERIDO' && tarjetaData.plazo > 0 && ` (${tarjetaData.plazo} cuotas)`}
            </Typography>
          </Paper>
        )}

        {/* Botones */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            onClick={handleRegistrar}
            sx={{
              fontWeight: 'bold',
              minWidth: 120,
              backgroundColor: '#1A3C6D',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#16345C',
              }
            }}
            startIcon={<CreditCardIcon />}
          >
            REGISTRAR
          </Button>
          <Button
           variant="contained"
            onClick={handleRegistrar}
            sx={{
              fontWeight: 'bold',
              minWidth: 120,
              backgroundColor: '#1A3C6D',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#16345C',
              }
            }}
          >
            CERRAR
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}