import { Paper, Table, TableContainer, TableHead } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

import './home-page.styles.scss';

function HomePage() {
    return (
        <div className='homepage'>
            <Box>

                <Paper>
                    <TableContainer>
                        <Table>
                            <TableHead></TableHead>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </div>
    )
}

export default HomePage;