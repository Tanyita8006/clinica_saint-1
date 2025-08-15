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
  Checkbox,
  FormControlLabel,
  Grid,
  Card,
  CardContent,
  IconButton,
  ListItemButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';

interface MedicoReferido {
  codigo: string;
  cedula: string;
  nombre: string;
  especialidad: string;
  correo: string;
}

interface TipoPago {
  efectivo: number;
  cheque: number;
  credito: number;
  tarjeta: number;
  transferencia: number;
  retiene: number;
}

interface Totales {
  subtotal: number;
  iva0: number;
  iva15: number;
  recargo: number;
  promocion: number;
  descuentos: number;
  abono: number;
  iva: number;
  total: number;
}

interface ServicioFacturado {
  id: number;
  codigo: string;
  descripcion: string;
  cantidad: number;
  precio: number;
  total: number;
}

export default function Referidos() {
  const [medicosReferidos, setMedicosReferidos] = useState<MedicoReferido[]>([]);
  const [medicoSeleccionado, setMedicoSeleccionado] = useState<MedicoReferido | null>(null);
  const [correoFactura, setCorreoFactura] = useState('');
  const [paga, setPaga] = useState<number | ''>('');
  const [cambio, setCambio] = useState<number>(0);
  
  const [tiposPago, setTiposPago] = useState<TipoPago>({
    efectivo: 0,
    cheque: 0,
    credito: 0,
    tarjeta: 0,
    transferencia: 0,
    retiene: 0,
  });

  const [totales, setTotales] = useState<Totales>({
    subtotal: 0,
    iva0: 0,
    iva15: 0,
    recargo: 0,
    promocion: 0,
    descuentos: 0,
    abono: 0,
    iva: 0,
    total: 0,
  });

  const [serviciosFacturados, setServiciosFacturados] = useState<ServicioFacturado[]>([]);
  const [servicioSeleccionado, setServicioSeleccionado] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Estilos comunes
  const textFieldProps = {
    size: 'small' as const,
    fullWidth: true,
    InputProps: { style: { fontSize: 12, height: 35 } },
    InputLabelProps: { style: { fontSize: 12, fontWeight: 'bold' } },
  };

  // Cargar médicos referidos desde asignación de camas
  useEffect(() => {
    const medicosData: MedicoReferido[] = [
      {
        codigo: 'MED001',
        cedula: '0102030405',
        nombre: 'DR. JULIO CESAR ESPEJO SOLIS',
        especialidad: 'CARDIOLOGÍA',
        correo: 'julio.espejo@clinica.com',
      },
      {
        codigo: 'MED002',
        cedula: '0987654321',
        nombre: 'DRA. BLANCA AZUL LAS HORTENSIAS',
        especialidad: 'NEUROLOGÍA',
        correo: 'blanca.azul@clinica.com',
      },
      {
        codigo: 'MED003',
        cedula: '0924235855',
        nombre: 'DR. ALEX GERMAN BLUE SALAZAR',
        especialidad: 'TRAUMATOLOGÍA',
        correo: 'alex.blue@clinica.com',
      },
      {
        codigo: 'MED004',
        cedula: '0924936085',
        nombre: 'DR. PATRICIO JACINTO RODRIGUEZ',
        especialidad: 'GINECOLOGÍA',
        correo: 'patricio.rodriguez@clinica.com',
      },
    ];

    setMedicosReferidos(medicosData);

    // Simular servicios facturados
    const servicios: ServicioFacturado[] = [
      { id: 1, codigo: 'CONS001', descripcion: 'CONSULTA CARDIOLOGÍA', cantidad: 1, precio: 85.00, total: 85.00 },
      { id: 2, codigo: 'LAB001', descripcion: 'ELECTROCARDIOGRAMA', cantidad: 1, precio: 45.00, total: 45.00 },
      { id: 3, codigo: 'MED001', descripcion: 'MEDICAMENTOS', cantidad: 2, precio: 25.50, total: 51.00 },
    ];

    setServiciosFacturados(servicios);
  }, []);

  // Calcular totales automáticamente
  useEffect(() => {
    const subtotal = serviciosFacturados.reduce((sum, servicio) => sum + servicio.total, 0);
    const iva15 = subtotal * 0.15;
    const totalConIva = subtotal + iva15;
    const totalFinal = totalConIva + totales.recargo - totales.promocion - totales.descuentos - totales.abono;

    setTotales(prev => ({
      ...prev,
      subtotal,
      iva15,
      iva: iva15,
      total: totalFinal,
    }));
  }, [serviciosFacturados, totales.recargo, totales.promocion, totales.descuentos, totales.abono]);

  // Calcular cambio
  useEffect(() => {
    if (paga && typeof paga === 'number') {
      const totalPagos = Object.values(tiposPago).reduce((sum, valor) => sum + valor, 0);
      const cambioCalculado = paga - (totales.total - totalPagos);
      setCambio(cambioCalculado > 0 ? cambioCalculado : 0);
    } else {
      setCambio(0);
    }
  }, [paga, tiposPago, totales.total]);

  const handleMedicoSelect = (medico: MedicoReferido) => {
    setMedicoSeleccionado(medico);
    setCorreoFactura(medico.correo);
    setErrorMessage('');
  };

  const handleTipoPagoChange = (tipo: keyof TipoPago, valor: string) => {
    setTiposPago(prev => ({
      ...prev,
      [tipo]: Number(valor) || 0,
    }));
  };

  const handleTotalChange = (campo: keyof Totales, valor: string) => {
    setTotales(prev => ({
      ...prev,
      [campo]: Number(valor) || 0,
    }));
  };

  const handleEliminarServicio = (id: number) => {
    setServiciosFacturados(prev => prev.filter(servicio => servicio.id !== id));
    setServicioSeleccionado(null);
    setSuccessMessage('Servicio eliminado correctamente');
    setTimeout(() => setSuccessMessage(''), 2000);
  };

  const handleRegistrar = () => {
    if (!medicoSeleccionado) {
      setErrorMessage('Debe seleccionar un médico referido');
      return;
    }

    if (serviciosFacturados.length === 0) {
      setErrorMessage('No hay servicios para facturar');
      return;
    }

    console.log('Factura registrada:', {
      medico: medicoSeleccionado,
      correoFactura,
      servicios: serviciosFacturados,
      tiposPago,
      totales,
      paga,
      cambio,
    });

    setSuccessMessage('Factura registrada correctamente');
    setTimeout(() => {
      handleCerrar();
    }, 2000);
  };

  const handleCerrar = () => {
    setMedicoSeleccionado(null);
    setCorreoFactura('');
    setPaga('');
    setCambio(0);
    setTiposPago({
      efectivo: 0,
      cheque: 0,
      credito: 0,
      tarjeta: 0,
      transferencia: 0,
      retiene: 0,
    });
    setErrorMessage('');
    setSuccessMessage('');
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography
        variant="h5"
        sx={{
          color: '#1A3C6D',
          fontWeight: 'bold',
          mb: 3,
          textAlign: 'center',
        }}
      >
        REFERIDOS - FACTURACIÓN
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

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {/* Lista de Médicos Referidos */}
        <Box sx={{ flex: '1 1 48%', minWidth: '400px' }}>
          <Paper elevation={2} sx={{ p: 2, height: '400px' }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#1A3C6D', fontWeight: 'bold' }}>
              MÉDICOS REFERIDOS
            </Typography>
            <List sx={{ maxHeight: 320, overflow: 'auto' }}>
              {medicosReferidos.map((medico, index) => (
                <React.Fragment key={medico.codigo}>
                  <ListItemButton
                    onClick={() => handleMedicoSelect(medico)}
                    selected={medicoSeleccionado?.codigo === medico.codigo}
                    sx={{
                      '&.Mui-selected': {
                        backgroundColor: '#E3F2FD',
                      }
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          {medico.codigo} - {medico.nombre}
                        </Typography>
                      }
                      secondary={
                        <Box>
                          <Typography variant="caption" sx={{ display: 'block' }}>
                            Cédula: {medico.cedula}
                          </Typography>
                          <Typography variant="caption" sx={{ display: 'block' }}>
                            Especialidad: {medico.especialidad}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItemButton>
                  {index < medicosReferidos.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Box>

        {/* Información del Médico Seleccionado y Facturación */}
        <Box sx={{ flex: '1 1 48%', minWidth: '400px' }}>
          {medicoSeleccionado && (
            <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#1A3C6D', fontWeight: 'bold' }}>
                MÉDICO SELECCIONADO
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2"><strong>Código:</strong> {medicoSeleccionado.codigo}</Typography>
                <Typography variant="body2"><strong>Nombre:</strong> {medicoSeleccionado.nombre}</Typography>
                <Typography variant="body2"><strong>Especialidad:</strong> {medicoSeleccionado.especialidad}</Typography>
              </Box>
              
              <TextField
                label="CORREO ELECTRÓNICO"
                value={correoFactura}
                onChange={(e) => setCorreoFactura(e.target.value)}
                {...textFieldProps}
                InputProps={{
                  ...textFieldProps.InputProps,
                  endAdornment: <EmailIcon />,
                }}
                sx={{ mb: 2 }}
              />

              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="PAGA"
                  type="number"
                  value={paga}
                  onChange={(e) => setPaga(Number(e.target.value) || '')}
                  {...textFieldProps}
                />
                <TextField
                  label="CAMBIO"
                  value={cambio.toFixed(2)}
                  disabled
                  {...textFieldProps}
                />
              </Box>
            </Paper>
          )}

          {/* Servicios Facturados */}
          <Paper elevation={2} sx={{ p: 2, height: '250px' }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#1A3C6D', fontWeight: 'bold' }}>
              SERVICIOS FACTURADOS
            </Typography>
            <List sx={{ maxHeight: 180, overflow: 'auto' }}>
              {serviciosFacturados.map((servicio) => (
                <ListItemButton
                  key={servicio.id}
                  selected={servicioSeleccionado === servicio.id}
                  onClick={() => setServicioSeleccionado(servicio.id)}
                  sx={{
                    '&.Mui-selected': { backgroundColor: '#FFE0E0' }
                  }}
                >
                  <ListItemText
                    primary={`${servicio.codigo} - ${servicio.descripcion}`}
                    secondary={`Cant: ${servicio.cantidad} | Precio: $${servicio.precio} | Total: $${servicio.total}`}
                  />
                  <IconButton 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEliminarServicio(servicio.id);
                    }}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemButton>
              ))}
            </List>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 3 }}>
        {/* Tipos de Pago */}
        <Box sx={{ flex: '1 1 48%', minWidth: '400px' }}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: '#1A3C6D', fontWeight: 'bold' }}>
                TIPO DE PAGO
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ flex: '1 1 45%', minWidth: '150px' }}>
                  <TextField
                    label="EFECTIVO"
                    type="number"
                    value={tiposPago.efectivo}
                    onChange={(e) => handleTipoPagoChange('efectivo', e.target.value)}
                    {...textFieldProps}
                  />
                </Box>
                <Box sx={{ flex: '1 1 45%', minWidth: '150px' }}>
                  <TextField
                    label="CHEQUE"
                    type="number"
                    value={tiposPago.cheque}
                    onChange={(e) => handleTipoPagoChange('cheque', e.target.value)}
                    {...textFieldProps}
                  />
                </Box>
                <Box sx={{ flex: '1 1 45%', minWidth: '150px' }}>
                  <TextField
                    label="CRÉDITO"
                    type="number"
                    value={tiposPago.credito}
                    onChange={(e) => handleTipoPagoChange('credito', e.target.value)}
                    {...textFieldProps}
                  />
                </Box>
                <Box sx={{ flex: '1 1 45%', minWidth: '150px' }}>
                  <TextField
                    label="TARJETA"
                    type="number"
                    value={tiposPago.tarjeta}
                    onChange={(e) => handleTipoPagoChange('tarjeta', e.target.value)}
                    {...textFieldProps}
                  />
                </Box>
                <Box sx={{ flex: '1 1 45%', minWidth: '150px' }}>
                  <TextField
                    label="TRANSFERENCIA"
                    type="number"
                    value={tiposPago.transferencia}
                    onChange={(e) => handleTipoPagoChange('transferencia', e.target.value)}
                    {...textFieldProps}
                  />
                </Box>
                <Box sx={{ flex: '1 1 45%', minWidth: '150px' }}>
                  <TextField
                    label="RETIENE"
                    type="number"
                    value={tiposPago.retiene}
                    onChange={(e) => handleTipoPagoChange('retiene', e.target.value)}
                    {...textFieldProps}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Totales */}
        <Box sx={{ flex: '1 1 48%', minWidth: '400px' }}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: '#1A3C6D', fontWeight: 'bold' }}>
                TOTALES
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ flex: '1 1 45%', minWidth: '150px' }}>
                  <TextField
                    label="SUBTOTAL"
                    value={totales.subtotal.toFixed(2)}
                    disabled
                    {...textFieldProps}
                  />
                </Box>
                <Box sx={{ flex: '1 1 45%', minWidth: '150px' }}>
                  <TextField
                    label="IVA 0%"
                    type="number"
                    value={totales.iva0}
                    onChange={(e) => handleTotalChange('iva0', e.target.value)}
                    {...textFieldProps}
                  />
                </Box>
                <Box sx={{ flex: '1 1 45%', minWidth: '150px' }}>
                  <TextField
                    label="IVA 15%"
                    value={totales.iva15.toFixed(2)}
                    disabled
                    {...textFieldProps}
                  />
                </Box>
                <Box sx={{ flex: '1 1 45%', minWidth: '150px' }}>
                  <TextField
                    label="RECARGO"
                    type="number"
                    value={totales.recargo}
                    onChange={(e) => handleTotalChange('recargo', e.target.value)}
                    {...textFieldProps}
                  />
                </Box>
                <Box sx={{ flex: '1 1 45%', minWidth: '150px' }}>
                  <TextField
                    label="PROMOCIÓN"
                    type="number"
                    value={totales.promocion}
                    onChange={(e) => handleTotalChange('promocion', e.target.value)}
                    {...textFieldProps}
                  />
                </Box>
                <Box sx={{ flex: '1 1 45%', minWidth: '150px' }}>
                  <TextField
                    label="DESCUENTOS"
                    type="number"
                    value={totales.descuentos}
                    onChange={(e) => handleTotalChange('descuentos', e.target.value)}
                    {...textFieldProps}
                  />
                </Box>
                <Box sx={{ flex: '1 1 45%', minWidth: '150px' }}>
                  <TextField
                    label="ABONO"
                    type="number"
                    value={totales.abono}
                    onChange={(e) => handleTotalChange('abono', e.target.value)}
                    {...textFieldProps}
                  />
                </Box>
                <Box sx={{ flex: '1 1 45%', minWidth: '150px' }}>
                  <TextField
                    label="IVA"
                    value={totales.iva.toFixed(2)}
                    disabled
                    {...textFieldProps}
                  />
                </Box>
                <Box sx={{ flex: '1 1 100%' }}>
                  <TextField
                    label="TOTAL"
                    value={totales.total.toFixed(2)}
                    disabled
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#E8F5E8',
                        fontWeight: 'bold',
                        fontSize: 16,
                      }
                    }}
                    {...textFieldProps}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Botones de Opciones */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3 }}>
        
        <Button
          variant="contained"
          color="error"
          onClick={() => servicioSeleccionado && handleEliminarServicio(servicioSeleccionado)}
          sx={{ fontWeight: 'bold', minWidth: 120 }}
          disabled={!servicioSeleccionado}
        >
          ELIMINAR
        </Button>
        
      </Box>
    </Box>
  );
}