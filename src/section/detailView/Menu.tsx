import { Box, Skeleton, Stack, Typography } from '@mui/material'
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getData } from '../../utils/detailview';
const Menu = () => {

    const { id } = useParams<{ id: string }>();

    const { data: brandData, isLoading: isDataLoading } = useQuery({
        queryKey: ["getdata"],
        queryFn: getData
    });

    console.log("brandData", brandData);

    const barndId = parseInt(id || '0');
    const brand = brandData?.find((item: { id: number; }) => barndId === item.id);

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginBottom: 3,
                marginInline: { lg: '160px', xs: '30px' }
            }}
        >
            {isDataLoading ? (
                <>

                    <Box sx={{ textAlign: 'center' }}>
                        <Skeleton variant="text" width={100} height={50} sx={{ margin: '8px auto' }} />
                        <Skeleton variant="rectangular" height={250} width={200} sx={{ borderRadius: '15px' }} />

                    </Box>

                </>
            ) : (
                <>
                    <Box sx={{ width: '500px', paddingInline: '30px', '@media (max-width:600px)': { marginLeft: '0px', width: '200px' } }}>
                        <Typography fontSize={24} fontWeight="200" textAlign="left">Menu</Typography>
                    </Box>
                    <Stack
                        flexDirection={{ xs: 'column', sm: 'row', md: 'row', lg: 'row', xl: 'row' }}
                        justifyContent="center"
                        gap={{ xs: 3, sm: 3, md: 3, lg: 3 }}
                        marginTop={2}
                        marginInline={3}
                    >
                        <Box sx={{ textAlign: 'center' }}>
                            <Box
                                component="img"
                                src={brand?.menu?.menu1}
                                height="250px"
                                width="200px"
                                sx={{ borderRadius: '15px' }}
                            />
                            <Typography sx={{ marginTop: 1 }}>Dining Menu</Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <Box
                                component="img"
                                src={brand?.menu?.menu2}
                                height="250px"
                                width="200px"
                                sx={{ borderRadius: '15px' }}
                            />
                            <Typography sx={{ marginTop: 1 }}>Takeaway Menu</Typography>
                        </Box>
                    </Stack>
                </>
            )}
        </Box>
    );
}

export default Menu;
