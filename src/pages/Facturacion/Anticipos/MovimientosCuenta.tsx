import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Alert,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Tooltip,
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface MovimientoCuenta {
    id: number;
    numeroComprobante: string;
    valorAbonado: number;
    egreso: number;
    saldo: number;
    fecha: string;
    hora: string;
    estado: 'ACTIVO' | 'INACTIVO';
    formaPago: string;
    observacion: string;
}

interface MovimientoForm {
    numeroComprobante: string;
    valorAbonado: number;
    egreso: number;
    fecha: string;
    hora: string;
    estado: 'ACTIVO' | 'INACTIVO';
    formaPago: string;
    observacion: string;
}

export default function MovimientosCuenta() {
    const [movimientos, setMovimientos] = useState<MovimientoCuenta[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [saldoActual, setSaldoActual] = useState<number>(0);

    const [formData, setFormData] = useState<MovimientoForm>({
        numeroComprobante: '',
        valorAbonado: 0,
        egreso: 0,
        fecha: '',
        hora: '',
        estado: 'ACTIVO',
        formaPago: '',
        observacion: '',
    });

    // Datos simulados iniciales
    const movimientosIniciales: MovimientoCuenta[] = [
        {
            id: 1,
            numeroComprobante: '10370',
            valorAbonado: 500.00,
            egreso: 0.00,
            saldo: 500.00,
            fecha: '03/06/2025',
            hora: '19:26:35',
            estado: 'ACTIVO',
            formaPago: 'TARJETA',
            observacion: 'Anticipo para cirugía programada'
        },
        {
            id: 2,
            numeroComprobante: '10371',
            valorAbonado: 50.00,
            egreso: 0.00,
            saldo: 550.00,
            fecha: '03/06/2025',
            hora: '19:28:46',
            estado: 'ACTIVO',
            formaPago: 'TARJETA',
            observacion: 'Abono adicional'
        },
        {
            id: 3,
            numeroComprobante: '10372',
            valorAbonado: 0.00,
            egreso: 550.00,
            saldo: 0.00,
            fecha: '04/06/2025',
            hora: '16:10:22',
            estado: 'ACTIVO',
            formaPago: 'EFECTIVO',
            observacion: 'Aplicación de anticipo a factura'
        },
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

    useEffect(() => {
        setMovimientos(movimientosIniciales);
        calcularSaldoActual(movimientosIniciales);
    }, []);

    const calcularSaldoActual = (movimientosList: MovimientoCuenta[]) => {
        if (movimientosList.length === 0) {
            setSaldoActual(0);
            return;
        }

        // El saldo actual es el último saldo registrado
        const ultimoMovimiento = movimientosList[movimientosList.length - 1];
        setSaldoActual(ultimoMovimiento.saldo);
    };

    const handleInputChange = (field: keyof MovimientoForm, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        if (errorMessage || successMessage) {
            setErrorMessage('');
            setSuccessMessage('');
        }
    };

    const getCurrentDateTime = () => {
        const now = new Date();
        const fecha = now.toLocaleDateString('es-EC', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        const hora = now.toLocaleTimeString('es-EC', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        return { fecha, hora };
    };

    const validarFormulario = () => {
        if (!formData.numeroComprobante) {
            setErrorMessage('El número de comprobante es obligatorio');
            return false;
        }

        if (formData.valorAbonado === 0 && formData.egreso === 0) {
            setErrorMessage('Debe ingresar un valor abonado o un egreso');
            return false;
        }

        if (formData.valorAbonado > 0 && formData.egreso > 0) {
            setErrorMessage('No puede haber valor abonado y egreso al mismo tiempo');
            return false;
        }

        if (!formData.formaPago) {
            setErrorMessage('La forma de pago es obligatoria');
            return false;
        }

        return true;
    };

    const calcularNuevoSaldo = (valorAbonado: number, egreso: number) => {
        return saldoActual + valorAbonado - egreso;
    };

    const abrirModal = (movimiento?: MovimientoCuenta) => {
        if (movimiento) {
            setEditingId(movimiento.id);
            setFormData({
                numeroComprobante: movimiento.numeroComprobante,
                valorAbonado: movimiento.valorAbonado,
                egreso: movimiento.egreso,
                fecha: movimiento.fecha,
                hora: movimiento.hora,
                estado: movimiento.estado,
                formaPago: movimiento.formaPago,
                observacion: movimiento.observacion,
            });
        } else {
            setEditingId(null);
            const { fecha, hora } = getCurrentDateTime();
            setFormData({
                numeroComprobante: '',
                valorAbonado: 0,
                egreso: 0,
                fecha,
                hora,
                estado: 'ACTIVO',
                formaPago: '',
                observacion: '',
            });
        }
        setModalOpen(true);
    };

    const cerrarModal = () => {
        setModalOpen(false);
        setEditingId(null);
        setErrorMessage('');
        setSuccessMessage('');
    };

    const guardarMovimiento = () => {
        if (!validarFormulario()) return;

        const nuevoSaldo = calcularNuevoSaldo(formData.valorAbonado, formData.egreso);

        if (editingId) {
            // Editar movimiento existente
            const movimientosActualizados = movimientos.map(mov =>
                mov.id === editingId
                    ? { ...mov, ...formData, saldo: nuevoSaldo }
                    : mov
            );
            setMovimientos(movimientosActualizados);
            calcularSaldoActual(movimientosActualizados);
            setSuccessMessage('Movimiento actualizado correctamente');
        } else {
            // Crear nuevo movimiento
            const nuevoMovimiento: MovimientoCuenta = {
                id: Date.now(),
                ...formData,
                saldo: nuevoSaldo,
            };
            const nuevosMovimientos = [...movimientos, nuevoMovimiento];
            setMovimientos(nuevosMovimientos);
            calcularSaldoActual(nuevosMovimientos);
            setSuccessMessage('Movimiento registrado correctamente');
        }

        cerrarModal();
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const eliminarMovimiento = (id: number) => {
        if (window.confirm('¿Está seguro de eliminar este movimiento?')) {
            const movimientosFiltrados = movimientos.filter(mov => mov.id !== id);
            setMovimientos(movimientosFiltrados);
            calcularSaldoActual(movimientosFiltrados);
            setSuccessMessage('Movimiento eliminado correctamente');
            setTimeout(() => setSuccessMessage(''), 3000);
        }
    };

    const getEstadoColor = (estado: string) => {
        return estado === 'ACTIVO' ? 'success' : 'error';
    };

    const getValorColor = (valor: number, tipo: 'abono' | 'egreso') => {
        if (valor === 0) return '#666';
        return tipo === 'abono' ? '#4CAF50' : '#F44336';
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
                MOVIMIENTOS DE CUENTA
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


            {/* Botón Agregar */}
            <Box sx={{ mb: 3, textAlign: 'left' }}>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    size="small"
                    sx={{
                        background: "#1A3C6D",
                        "&:hover": { background: "#274472" },
                        fontSize: "0.8rem"
                    }}
                >
                    NUEVO MOVIMIENTO
                </Button>
            </Box>

            {/* Tabla de Movimientos */}
            <Paper elevation={2}>
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#F5F5F5' }}>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 11 }}>N° COMPROBANTE</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 11 }}>VALOR ABONADO</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 11 }}>EGRESO</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 11 }}>SALDO</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 11 }}>FECHA</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 11 }}>HORA</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 11 }}>ESTADO</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 11 }}>FORMA PAGO</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 11 }}>ACCIONES</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {movimientos.map((movimiento) => (
                                <TableRow key={movimiento.id} hover>
                                    <TableCell sx={{ fontSize: 11 }}>{movimiento.numeroComprobante}</TableCell>
                                    <TableCell
                                        sx={{
                                            fontSize: 11,
                                            color: getValorColor(movimiento.valorAbonado, 'abono'),
                                            fontWeight: movimiento.valorAbonado > 0 ? 'bold' : 'normal'
                                        }}
                                    >
                                        {movimiento.valorAbonado.toFixed(2)}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            fontSize: 11,
                                            color: getValorColor(movimiento.egreso, 'egreso'),
                                            fontWeight: movimiento.egreso > 0 ? 'bold' : 'normal'
                                        }}
                                    >
                                        {movimiento.egreso.toFixed(2)}
                                    </TableCell>
                                    <TableCell sx={{ fontSize: 11, fontWeight: 'bold', color: '#1A3C6D' }}>
                                        {movimiento.saldo.toFixed(2)}
                                    </TableCell>
                                    <TableCell sx={{ fontSize: 11 }}>{movimiento.fecha}</TableCell>
                                    <TableCell sx={{ fontSize: 11 }}>{movimiento.hora}</TableCell>
                                    <TableCell sx={{ fontSize: 11 }}>
                                        <Chip
                                            label={movimiento.estado}
                                            size="small"
                                            color={getEstadoColor(movimiento.estado)}
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell sx={{ fontSize: 11 }}>{movimiento.formaPago}</TableCell>
                                    <TableCell sx={{ fontSize: 11 }}>
                                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                                            <Tooltip title="Ver observación">
                                                <IconButton
                                                    size="small"
                                                    color="info"
                                                    onClick={() => alert(`Observación: ${movimiento.observacion}`)}
                                                >
                                                    <VisibilityIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Editar">
                                                <IconButton
                                                    size="small"
                                                    color="primary"
                                                    onClick={() => abrirModal(movimiento)}
                                                >
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Eliminar">
                                                <IconButton
                                                    size="small"
                                                    color="error"
                                                    onClick={() => eliminarMovimiento(movimiento.id)}
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {movimientos.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={9} sx={{ textAlign: 'center', py: 3 }}>
                                        <Typography variant="body2" color="textSecondary">
                                            No hay movimientos registrados
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* Modal para Agregar/Editar Movimiento */}
            <Dialog open={modalOpen} onClose={cerrarModal} maxWidth="md" fullWidth>
                <DialogTitle sx={{ backgroundColor: '#1A3C6D', color: 'white' }}>
                    {editingId ? 'EDITAR MOVIMIENTO' : 'NUEVO MOVIMIENTO'}
                </DialogTitle>
                <DialogContent sx={{ pt: 3 }}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                        <Box sx={{ flex: '1 1 45%', minWidth: '200px' }}>
                            <TextField
                                label="N° COMPROBANTE *"
                                value={formData.numeroComprobante}
                                onChange={(e) => handleInputChange('numeroComprobante', e.target.value)}
                                {...textFieldProps}
                                sx={{ mb: 2 }}
                            />
                        </Box>

                        <Box sx={{ flex: '1 1 45%', minWidth: '200px' }}>
                            <FormControl {...selectProps} sx={{ mb: 2 }}>
                                <InputLabel sx={{ fontWeight: 'bold' }}>FORMA PAGO *</InputLabel>
                                <Select
                                    label="FORMA PAGO *"
                                    value={formData.formaPago}
                                    onChange={(e) => handleInputChange('formaPago', e.target.value)}
                                    {...selectProps}
                                >
                                    <MenuItem value="EFECTIVO">EFECTIVO</MenuItem>
                                    <MenuItem value="TARJETA">TARJETA</MenuItem>
                                    <MenuItem value="TRANSFERENCIA">TRANSFERENCIA</MenuItem>
                                    <MenuItem value="CHEQUE">CHEQUE</MenuItem>
                                    <MenuItem value="CREDITO">CRÉDITO</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Box sx={{ flex: '1 1 45%', minWidth: '200px' }}>
                            <TextField
                                label="VALOR ABONADO"
                                type="number"
                                value={formData.valorAbonado || ''}
                                onChange={(e) => handleInputChange('valorAbonado', parseFloat(e.target.value) || 0)}
                                {...textFieldProps}
                                sx={{ mb: 2 }}
                            />
                        </Box>

                        <Box sx={{ flex: '1 1 45%', minWidth: '200px' }}>
                            <TextField
                                label="EGRESO"
                                type="number"
                                value={formData.egreso || ''}
                                onChange={(e) => handleInputChange('egreso', parseFloat(e.target.value) || 0)}
                                {...textFieldProps}
                                sx={{ mb: 2 }}
                            />
                        </Box>

                        <Box sx={{ flex: '1 1 45%', minWidth: '200px' }}>
                            <TextField
                                label="FECHA"
                                value={formData.fecha}
                                onChange={(e) => handleInputChange('fecha', e.target.value)}
                                {...textFieldProps}
                                sx={{ mb: 2 }}
                                placeholder="DD/MM/YYYY"
                            />
                        </Box>

                        <Box sx={{ flex: '1 1 45%', minWidth: '200px' }}>
                            <TextField
                                label="HORA"
                                value={formData.hora}
                                onChange={(e) => handleInputChange('hora', e.target.value)}
                                {...textFieldProps}
                                sx={{ mb: 2 }}
                                placeholder="HH:MM"
                            />
                        </Box>

                        <Box sx={{ flex: '1 1 45%', minWidth: '200px' }}>
                            <FormControl {...selectProps} sx={{ mb: 2 }}>
                                <InputLabel sx={{ fontWeight: 'bold' }}>ESTADO</InputLabel>
                                <Select
                                    label="ESTADO"
                                    value={formData.estado}
                                    onChange={(e) => handleInputChange('estado', e.target.value)}
                                    {...selectProps}
                                >
                                    <MenuItem value="ACTIVO">ACTIVO</MenuItem>
                                    <MenuItem value="INACTIVO">INACTIVO</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Box sx={{ flex: '1 1 100%' }}>
                            <TextField
                                label="OBSERVACIÓN"
                                multiline
                                rows={3}
                                value={formData.observacion}
                                onChange={(e) => handleInputChange('observacion', e.target.value)}
                                {...textFieldProps}
                                InputProps={{
                                    ...textFieldProps.InputProps,
                                    style: { ...textFieldProps.InputProps.style, height: 'auto', minHeight: 70 }
                                }}
                            />
                        </Box>
                    </Box>

                    {/* Vista previa del saldo */}
                    <Paper elevation={1} sx={{ p: 2, mt: 2, backgroundColor: '#F0F8FF' }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            NUEVO SALDO CALCULADO: ${calcularNuevoSaldo(formData.valorAbonado, formData.egreso).toFixed(2)}
                        </Typography>
                    </Paper>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button
                        onClick={cerrarModal}
                        color="secondary"
                        startIcon={<CancelIcon />}
                        sx={{ fontWeight: 'bold' }}
                    >
                        CANCELAR
                    </Button>
                    <Button
                        onClick={guardarMovimiento}
                        color="primary"
                        variant="contained"
                        startIcon={<SaveIcon />}
                        sx={{ fontWeight: 'bold' }}
                    >
                        GUARDAR
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}