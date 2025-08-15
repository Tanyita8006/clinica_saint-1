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
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';

interface Cliente {
    id: number;
    numeroHC: string;
    cedula: string;
    apellidos: string;
    nombres: string;
    tipoCliente: 'SEGURO' | 'PARTICULAR' | 'CENTRO_MEDICO';
    telefono: string;
    direccion: string;
    estado: string;
}

interface BusquedaData {
    numeroHC: string;
    apellido: string;
    cedula: string;
    tipoCliente: string;
}

export default function DatosGenerales() {
    const [busquedaData, setBusquedaData] = useState<BusquedaData>({
        numeroHC: '',
        apellido: '',
        cedula: '',
        tipoCliente: '',
    });

    const [resultadosBusqueda, setResultadosBusqueda] = useState<Cliente[]>([]);
    const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [buscando, setBuscando] = useState(false);

    // Datos simulados de clientes desde admisión
    const clientesData: Cliente[] = [
        {
            id: 1,
            numeroHC: 'HC001234',
            cedula: '0102030405',
            apellidos: 'PÉREZ GARCÍA',
            nombres: 'JUAN CARLOS',
            tipoCliente: 'PARTICULAR',
            telefono: '0998877665',
            direccion: 'AV. 9 DE OCTUBRE 123',
            estado: 'ACTIVO',
        },
        {
            id: 2,
            numeroHC: 'HC001235',
            cedula: '0987654321',
            apellidos: 'GONZÁLEZ LÓPEZ',
            nombres: 'MARÍA ELENA',
            tipoCliente: 'SEGURO',
            telefono: '0987654321',
            direccion: 'CDLA. KENNEDY MZ 15 VILLA 8',
            estado: 'ACTIVO',
        },
        {
            id: 3,
            numeroHC: 'HC001236',
            cedula: '0123456789',
            apellidos: 'RODRÍGUEZ SANTOS',
            nombres: 'CARLOS ALBERTO',
            tipoCliente: 'CENTRO_MEDICO',
            telefono: '0912345678',
            direccion: 'URDESA CENTRAL CALLE 1RA',
            estado: 'ACTIVO',
        },
        {
            id: 4,
            numeroHC: 'HC001237',
            cedula: '0456789123',
            apellidos: 'MARTÍNEZ VERA',
            nombres: 'ANA LUCÍA',
            tipoCliente: 'PARTICULAR',
            telefono: '0934567890',
            direccion: 'LAS PEÑAS SECTOR NORTE',
            estado: 'ACTIVO',
        },
    ];

    // Simulación de cuentas pendientes por paciente
    const cuentasPendientesData = [
        {
            id: 1,
            numeroCuenta: 'C-2025001',
            fechaIngreso: '10/08/2025',
            servicio: 'HOSPITALIZACIÓN',
            saldoPendiente: 120.50,
            estado: 'PENDIENTE',
            idCliente: 1,
        },
        {
            id: 2,
            numeroCuenta: 'C-2025002',
            fechaIngreso: '12/08/2025',
            servicio: 'EMERGENCIA',
            saldoPendiente: 80.00,
            estado: 'PENDIENTE',
            idCliente: 1,
        },
        {
            id: 3,
            numeroCuenta: 'C-2025003',
            fechaIngreso: '13/08/2025',
            servicio: 'CONSULTA EXTERNA',
            saldoPendiente: 0,
            estado: 'CANCELADA',
            idCliente: 2,
        },
        {
            id: 4,
            numeroCuenta: 'C-2025004',
            fechaIngreso: '14/08/2025',
            servicio: 'HOSPITALIZACIÓN',
            saldoPendiente: 200.00,
            estado: 'PENDIENTE',
            idCliente: 2,
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

    const handleInputChange = (field: keyof BusquedaData, value: string) => {
        setBusquedaData(prev => ({
            ...prev,
            [field]: value
        }));

        // Limpiar mensajes y resultados cuando el usuario cambie los criterios
        if (errorMessage || successMessage) {
            setErrorMessage('');
            setSuccessMessage('');
        }
        if (resultadosBusqueda.length > 0) {
            setResultadosBusqueda([]);
            setClienteSeleccionado(null);
        }
    };

    const realizarBusqueda = () => {
        // Verificar que al menos un campo esté lleno
        if (!busquedaData.numeroHC && !busquedaData.apellido && !busquedaData.cedula && !busquedaData.tipoCliente) {
            setErrorMessage('Debe ingresar al menos un criterio de búsqueda');
            return;
        }

        setBuscando(true);
        setErrorMessage('');

        // Simular delay de búsqueda
        setTimeout(() => {
            let resultados = clientesData.filter(cliente => {
                let coincide = true;

                if (busquedaData.numeroHC) {
                    coincide = coincide && cliente.numeroHC.toLowerCase().includes(busquedaData.numeroHC.toLowerCase());
                }

                if (busquedaData.apellido) {
                    coincide = coincide && cliente.apellidos.toLowerCase().includes(busquedaData.apellido.toLowerCase());
                }

                if (busquedaData.cedula) {
                    coincide = coincide && cliente.cedula.includes(busquedaData.cedula);
                }

                if (busquedaData.tipoCliente) {
                    coincide = coincide && cliente.tipoCliente === busquedaData.tipoCliente;
                }

                return coincide;
            });

            setResultadosBusqueda(resultados);
            setBuscando(false);

            if (resultados.length === 0) {
                setErrorMessage('No se encontraron clientes con los criterios especificados');
            } else {
                setSuccessMessage(`Se encontraron ${resultados.length} cliente(s)`);
            }
        }, 1000);
    };

    const seleccionarCliente = (cliente: Cliente) => {
        setClienteSeleccionado(cliente);
        setSuccessMessage(`Cliente seleccionado: ${cliente.nombres} ${cliente.apellidos}`);
    };

    const limpiarBusqueda = () => {
        setBusquedaData({
            numeroHC: '',
            apellido: '',
            cedula: '',
            tipoCliente: '',
        });
        setResultadosBusqueda([]);
        setClienteSeleccionado(null);
        setErrorMessage('');
        setSuccessMessage('');
    };

    const getTipoClienteColor = (tipo: string) => {
        switch (tipo) {
            case 'SEGURO': return 'primary';
            case 'PARTICULAR': return 'success';
            case 'CENTRO_MEDICO': return 'warning';
            default: return 'default';
        }
    };

    const formatTipoCliente = (tipo: string) => {
        switch (tipo) {
            case 'CENTRO_MEDICO': return 'CENTRO MÉDICO';
            default: return tipo;
        }
    };

    // Filtrar cuentas pendientes del cliente seleccionado
    const cuentasPendientes = clienteSeleccionado
        ? cuentasPendientesData.filter(
            c => c.idCliente === clienteSeleccionado.id && c.estado === 'PENDIENTE'
        )
        : [];

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
                DATOS GENERALES - BÚSQUEDA DE CLIENTES
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

            {/* Formulario de Búsqueda */}
            <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 3, color: '#1A3C6D', fontWeight: 'bold' }}>
                    <SearchIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    BUSCAR POR:
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
                    <Box sx={{ flex: '1 1 45%', minWidth: '200px' }}>
                        <TextField
                            label="NÚMERO DE HISTORIA CLÍNICA (H.C.)"
                            value={busquedaData.numeroHC}
                            onChange={(e) => handleInputChange('numeroHC', e.target.value)}
                            placeholder="HC001234"
                            {...textFieldProps}
                        />
                    </Box>

                    <Box sx={{ flex: '1 1 45%', minWidth: '200px' }}>
                        <TextField
                            label="APELLIDO"
                            value={busquedaData.apellido}
                            onChange={(e) => handleInputChange('apellido', e.target.value)}
                            placeholder="Ingrese apellido"
                            {...textFieldProps}
                        />
                    </Box>

                    <Box sx={{ flex: '1 1 45%', minWidth: '200px' }}>
                        <TextField
                            label="CÉDULA"
                            value={busquedaData.cedula}
                            onChange={(e) => handleInputChange('cedula', e.target.value)}
                            placeholder="0123456789"
                            {...textFieldProps}
                        />
                    </Box>

                    <Box sx={{ flex: '1 1 45%', minWidth: '200px' }}>
                        <FormControl {...selectProps}>
                            <InputLabel sx={{ fontWeight: 'bold' }}>TIPO DE CLIENTE</InputLabel>
                            <Select
                                label="TIPO DE CLIENTE"
                                value={busquedaData.tipoCliente}
                                onChange={(e) => handleInputChange('tipoCliente', e.target.value)}
                                {...selectProps}
                            >
                                <MenuItem value="">TODOS</MenuItem>
                                <MenuItem value="SEGURO">SEGURO</MenuItem>
                                <MenuItem value="PARTICULAR">PARTICULAR</MenuItem>
                                <MenuItem value="CENTRO_MEDICO">CENTRO MÉDICO</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', }}>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: "#1A3C6D", color: "#fff", fontWeight: 'bold', minWidth: 120 }}
                        onClick={realizarBusqueda}
                        disabled={buscando}
                        startIcon={<SearchIcon />}
                    >
                        {buscando ? 'BUSCANDO...' : 'BUSCAR'}
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={limpiarBusqueda}
                        sx={{ backgroundColor: "#1A3C6D", color: "#fff", fontWeight: 'bold', minWidth: 120 }}
                    >
                        LIMPIAR
                    </Button>
                </Box>
            </Paper>

            {/* Resultados de Búsqueda */}
            {resultadosBusqueda.length > 0 && (
                <Paper elevation={2} sx={{ mb: 3 }}>
                    <Box sx={{ p: 2 }}>
                        <Typography variant="h6" sx={{ mb: 2, color: '#1A3C6D', fontWeight: 'bold' }}>
                            RESULTADOS DE BÚSQUEDA ({resultadosBusqueda.length})
                        </Typography>
                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: '#F5F5F5' }}>
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: 12 }}>H.C.</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: 12 }}>CÉDULA</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: 12 }}>APELLIDOS</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: 12 }}>NOMBRES</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: 12 }}>TIPO CLIENTE</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: 12 }}>ACCIONES</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {resultadosBusqueda.map((cliente) => (
                                        <TableRow
                                            key={cliente.id}
                                            hover
                                            sx={{
                                                backgroundColor: clienteSeleccionado?.id === cliente.id ? '#E3F2FD' : 'inherit',
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => seleccionarCliente(cliente)}
                                        >
                                            <TableCell sx={{ fontSize: 11 }}>{cliente.numeroHC}</TableCell>
                                            <TableCell sx={{ fontSize: 11 }}>{cliente.cedula}</TableCell>
                                            <TableCell sx={{ fontSize: 11 }}>{cliente.apellidos}</TableCell>
                                            <TableCell sx={{ fontSize: 11 }}>{cliente.nombres}</TableCell>
                                            <TableCell sx={{ fontSize: 11 }}>
                                                <Chip
                                                    label={formatTipoCliente(cliente.tipoCliente)}
                                                    size="small"
                                                    color={getTipoClienteColor(cliente.tipoCliente)}
                                                    variant="outlined"
                                                />
                                            </TableCell>
                                            <TableCell sx={{ fontSize: 11 }}>
                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        seleccionarCliente(cliente);
                                                    }}
                                                    sx={{ fontSize: 10 }}
                                                >
                                                    SELECCIONAR
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Paper>
            )}

            {/* Información del Cliente Seleccionado */}
            {clienteSeleccionado && (
                <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2, color: '#1A3C6D', fontWeight: 'bold' }}>
                        <PersonIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                        CLIENTE SELECCIONADO
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                        <Box sx={{ flex: '1 1 45%', minWidth: '200px' }}>
                            <TextField
                                label="HISTORIA CLÍNICA"
                                value={clienteSeleccionado.numeroHC}
                                disabled
                                {...textFieldProps}
                            />
                        </Box>
                        <Box sx={{ flex: '1 1 45%', minWidth: '200px' }}>
                            <TextField
                                label="CÉDULA"
                                value={clienteSeleccionado.cedula}
                                disabled
                                {...textFieldProps}
                            />
                        </Box>
                        <Box sx={{ flex: '1 1 45%', minWidth: '200px' }}>
                            <TextField
                                label="APELLIDOS"
                                value={clienteSeleccionado.apellidos}
                                disabled
                                {...textFieldProps}
                            />
                        </Box>
                        <Box sx={{ flex: '1 1 45%', minWidth: '200px' }}>
                            <TextField
                                label="NOMBRES"
                                value={clienteSeleccionado.nombres}
                                disabled
                                {...textFieldProps}
                            />
                        </Box>
                        <Box sx={{ flex: '1 1 45%', minWidth: '200px' }}>
                            <TextField
                                label="TIPO DE CLIENTE"
                                value={formatTipoCliente(clienteSeleccionado.tipoCliente)}
                                disabled
                                {...textFieldProps}
                            />
                        </Box>
                        <Box sx={{ flex: '1 1 45%', minWidth: '200px' }}>
                            <TextField
                                label="TELÉFONO"
                                value={clienteSeleccionado.telefono}
                                disabled
                                {...textFieldProps}
                            />
                        </Box>
                        <Box sx={{ flex: '1 1 100%' }}>
                            <TextField
                                label="DIRECCIÓN"
                                value={clienteSeleccionado.direccion}
                                disabled
                                multiline
                                rows={2}
                                {...textFieldProps}
                                InputProps={{
                                    ...textFieldProps.InputProps,
                                    style: {
                                        ...textFieldProps.InputProps.style,
                                        height: 'auto',
                                        minHeight: 60,
                                    }
                                }}
                            />
                        </Box>
                    </Box>

                    {/* Mostrar cuentas pendientes */}
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#1A3C6D', mb: 1 }}>
                            CUENTAS PENDIENTES DEL PACIENTE
                        </Typography>
                        {cuentasPendientes.length === 0 ? (
                            <Typography sx={{ color: "#888", fontSize: 14 }}>
                                No existen cuentas pendientes para este paciente.
                            </Typography>
                        ) : (
                            <TableContainer>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: '#F5F5F5' }}>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: 12 }}>N° CUENTA</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: 12 }}>FECHA INGRESO</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: 12 }}>SERVICIO</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: 12 }}>SALDO PENDIENTE</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: 12 }}>ESTADO</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {cuentasPendientes.map((cuenta) => (
                                            <TableRow key={cuenta.id}>
                                                <TableCell sx={{ fontSize: 11 }}>{cuenta.numeroCuenta}</TableCell>
                                                <TableCell sx={{ fontSize: 11 }}>{cuenta.fechaIngreso}</TableCell>
                                                <TableCell sx={{ fontSize: 11 }}>{cuenta.servicio}</TableCell>
                                                <TableCell sx={{ fontSize: 11, fontWeight: 'bold', color: '#D32F2F' }}>
                                                    ${cuenta.saldoPendiente.toFixed(2)}
                                                </TableCell>
                                                <TableCell sx={{ fontSize: 11 }}>
                                                    <Chip
                                                        label={cuenta.estado}
                                                        size="small"
                                                        color={cuenta.estado === 'PENDIENTE' ? 'warning' : 'success'}
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </Box>
                </Paper>
            )}
        </Box>
    );
}