import { Paper, Table, TableContainer, TableHead } from '@mui/material';
import { Box } from '@mui/system';

import '@pages/home/home-page.styles.scss';
import { useTranslation } from 'react-i18next';

function HomePage() {
    const { t, i18n } = useTranslation();
    return (
        <div className='homepage'>
            <Box>

                <Paper>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <h1>{t('hello')}</h1>
                            </TableHead>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </div>
    )
}

export default HomePage;