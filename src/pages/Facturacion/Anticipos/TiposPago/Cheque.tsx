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
  Tabs,
  Tab,
  Divider,
} from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PaymentIcon from '@mui/icons-material/Payment';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

interface ChequeData {
  valor: number;
  banco: string;
  numeroCuenta: string;
  numeroCheque: string;
}

interface TransferenciaData {
  valor: number;
  bancoOrigen: string;
  bancoDestino: string;
  numeroCuenta: string;
  numeroComprobante: string;
}

export default function Cheque() {
  const [tabValue, setTabValue] = useState(0);
  
  const [chequeData, setChequeData] = useState<ChequeData>({
    valor: 0,
    banco: '',
    numeroCuenta: '',
    numeroCheque: '',
  });

  const [transferenciaData, setTransferenciaData] = useState<TransferenciaData>({
    valor: 0,
    bancoOrigen: '',
    bancoDestino: '',
    numeroCuenta: '',
    numeroComprobante: '',
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
    'BANCO DINERS CLUB',
    'BANCO CAPITAL',
  ];

  // Bancos de la clínica (para transferencias destino)
  const bancosClinica = [
    'BANCO PICHINCHA - CTA CORRIENTE 2100123456',
    'BANCO DEL PACIFICO - CTA AHORROS 4200987654',
    'PRODUBANCO - CTA CORRIENTE 1500567890',
    'BANCO DE GUAYAQUIL - CTA AHORROS 3400112233',
    'BANCO BOLIVARIANO - CTA CORRIENTE 5600445566',
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

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleChequeChange = (field: keyof ChequeData, value: any) => {
    setChequeData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errorMessage || successMessage) {
      setErrorMessage('');
      setSuccessMessage('');
    }
  };

  const handleTransferenciaChange = (field: keyof TransferenciaData, value: any) => {
    setTransferenciaData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errorMessage || successMessage) {
      setErrorMessage('');
      setSuccessMessage('');
    }
  };

  const validarCheque = () => {
    if (!chequeData.valor || chequeData.valor <= 0) {
      setErrorMessage('El valor debe ser mayor a 0');
      return false;
    }

    if (!chequeData.banco) {
      setErrorMessage('Debe seleccionar un banco');
      return false;
    }

    if (!chequeData.numeroCuenta) {
      setErrorMessage('El número de cuenta es obligatorio');
      return false;
    }

    if (!chequeData.numeroCheque) {
      setErrorMessage('El número de cheque es obligatorio');
      return false;
    }

    return true;
  };

  const validarTransferencia = () => {
    if (!transferenciaData.valor || transferenciaData.valor <= 0) {
      setErrorMessage('El valor debe ser mayor a 0');
      return false;
    }

    if (!transferenciaData.bancoOrigen) {
      setErrorMessage('Debe seleccionar el banco de origen');
      return false;
    }

    if (!transferenciaData.bancoDestino) {
      setErrorMessage('Debe seleccionar el banco de destino');
      return false;
    }

    if (!transferenciaData.numeroCuenta) {
      setErrorMessage('El número de cuenta es obligatorio');
      return false;
    }

    if (!transferenciaData.numeroComprobante) {
      setErrorMessage('El número de comprobante es obligatorio');
      return false;
    }

    return true;
  };

  const handleRegistrar = () => {
    if (tabValue === 0) {
      // Validar y registrar cheque
      if (!validarCheque()) return;
      
      console.log('Cheque registrado:', chequeData);
      setSuccessMessage(`Cheque por $${chequeData.valor} registrado correctamente`);
    } else {
      // Validar y registrar transferencia
      if (!validarTransferencia()) return;
      
      console.log('Transferencia registrada:', transferenciaData);
      setSuccessMessage(`Transferencia por $${transferenciaData.valor} registrada correctamente`);
    }

    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleCerrar = () => {
    setChequeData({
      valor: 0,
      banco: '',
      numeroCuenta: '',
      numeroCheque: '',
    });
    setTransferenciaData({
      valor: 0,
      bancoOrigen: '',
      bancoDestino: '',
      numeroCuenta: '',
      numeroComprobante: '',
    });
    setErrorMessage('');
    setSuccessMessage('');
    setTabValue(0);
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
        <AccountBalanceIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        PAGO CON CHEQUE
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
        {/* Tabs para Cheque y Transferencia */}
       

        {/* Panel de Cheque */}
      
          <Box>
            <Typography variant="h6" sx={{ mb: 3, color: '#1A3C6D', fontWeight: 'bold' }}>
              DETALLE DEL CHEQUE
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              {/* Columna Izquierda */}
              <Box sx={{ flex: '1 1 45%', minWidth: '300px' }}>
                {/* Valor */}
                <Box sx={{ mb: 3 }}>
                  <TextField
                    label="VALOR *"
                    type="number"
                    value={chequeData.valor || ''}
                    onChange={(e) => handleChequeChange('valor', parseFloat(e.target.value) || 0)}
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
                      value={chequeData.banco}
                      onChange={(e) => handleChequeChange('banco', e.target.value)}
                      {...selectProps}
                    >
                      {bancos.map((banco) => (
                        <MenuItem key={banco} value={banco}>
                          {banco}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>

              {/* Columna Derecha */}
              <Box sx={{ flex: '1 1 45%', minWidth: '300px' }}>
                {/* Número de Cuenta */}
                <Box sx={{ mb: 3 }}>
                  <TextField
                    label="N° DE CUENTA *"
                    value={chequeData.numeroCuenta}
                    onChange={(e) => handleChequeChange('numeroCuenta', e.target.value)}
                    {...textFieldProps}
                    placeholder="Número de cuenta del cheque"
                  />
                </Box>

                {/* Número de Cheque */}
                <Box sx={{ mb: 3 }}>
                  <TextField
                    label="N° DE CHEQUE *"
                    value={chequeData.numeroCheque}
                    onChange={(e) => handleChequeChange('numeroCheque', e.target.value)}
                    {...textFieldProps}
                    placeholder="Número del cheque"
                  />
                </Box>
              </Box>
            </Box>

            {/* Resumen del Cheque */}
            {chequeData.banco && chequeData.valor > 0 && (
              <Paper elevation={1} sx={{ p: 2, mt: 3, backgroundColor: '#F5F5F5' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  RESUMEN DEL CHEQUE:
                </Typography>
                <Typography variant="caption" sx={{ display: 'block' }}>
                  • Banco: {chequeData.banco}
                </Typography>
                <Typography variant="caption" sx={{ display: 'block' }}>
                  • Cuenta: {chequeData.numeroCuenta}
                </Typography>
                <Typography variant="caption" sx={{ display: 'block' }}>
                  • N° Cheque: {chequeData.numeroCheque}
                </Typography>
                <Typography variant="caption" sx={{ display: 'block', color: 'green', fontWeight: 'bold' }}>
                  • Valor: ${chequeData.valor.toFixed(2)}
                </Typography>
              </Paper>
            )}
          </Box>
 

        <Divider sx={{ my: 3 }} />

        {/* Botones */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
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
            startIcon={tabValue === 0 ? <ReceiptIcon /> : <SwapHorizIcon />}
          >
            REGISTRAR
          </Button>
          <Button
            variant="outlined"
            onClick={handleCerrar}
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