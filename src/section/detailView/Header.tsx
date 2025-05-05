import { Box, Skeleton, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import {
    headerItem1, headerItem2, headerItem3, mcdHeader1, mcdHeader2, mcdHeader3,
    burgurKing2, burgurKing3, starbuckImg1, starbuckImg2, starbuckImg3, kfc1, kfc2, kfc3
} from '../../assets/index';

import { useParams } from 'react-router';
import { getData } from '../../utils/detailview';
import { useQuery } from '@tanstack/react-query';



const Header = () => {
    const { id } = useParams<{ id: string }>();

    const { data: brandData, isLoading: isDataLoading } = useQuery({
        queryKey: ["getdata"],
        queryFn: getData
    });

    console.log("brandData", brandData);

    const barndId = parseInt(id || '0');
    const brand = brandData?.find((item: { id: number; }) => barndId === item.id);
    console.log("BRAND: ", brand);



    interface HeadersImg {
        id: number,
        image1: string,
        image2: string,
        image3: string
    }



    const [selectedBrand, setSelectedBrand] = useState<HeadersImg | null>(null);


    const headerImg: HeadersImg[] = brandData;

    // useEffect(() => {
    //     const barndId = parseInt(id || '0');
    //     console.log("brandId", barndId);
    //     const brand = brandData?.find((item) => barndId === item.id);
    //     console.log("brand", brand)
    //     setSelectedBrand(brand || null);
    // }, [id]);


    return (
        <>
            {isDataLoading ? (<>    <Stack
                sx={{
                    flexDirection: { lg: 'row', md: 'row', sm: 'row', xs: 'column' },
                    gap: '8px',
                    marginTop: { xs: '70px', lg: '70px', md: '70px', sm: '70px' },
                    '@media (max-width:600px)': {
                        marginTop: '100px',
                        gap: '0px',
                    },
                }}
            >
                {/* Left Side Skeleton (Image 1) */}
                <Box sx={{ width: { xs: '100%', md: '30%', lg: '50%' } }}>
                    <Skeleton variant="rounded" width="100%" height={568} animation="wave" />
                </Box>

                {/* Right Side Skeleton (Image 2 and 3) */}
                <Box width="50%">
                    <Stack
                        sx={{
                            flexDirection: {
                                lg: 'column',
                                md: 'column',
                                sm: 'column',
                                xs: 'row',
                            },
                            gap: '8px',
                            '@media (max-width:600px)': {
                                gap: '0px',
                            },
                        }}
                    >
                        <Skeleton variant="rounded" height={280} width="100%" animation="wave" />
                        <Skeleton variant="rounded" height={280} width="100%" animation="wave" />
                    </Stack>
                </Box>
            </Stack></>) : (<><Stack sx={{
                flexDirection: {
                    lg: 'row',
                    md: 'row',
                    sm: 'row',
                    xs: 'column'
                },
                gap: '8px',
                marginTop: {
                    xs: '70px',
                    lg: '70px',
                    md: '70px',
                    sm: '70px',
                },

                '@media (max-width:600px)': {
                    marginTop: '100px',
                    gap: '0px',

                },
            }}>
                <Box sx={{
                    sm: '100%',
                    md: '30%',
                    lg: '50%',
                    xs: '100%',


                }} >
                    <Box sx={{
                        height: {
                            xs: '300px',
                            lg: '568px',
                            md: '568px',
                            sm: '568px'
                        }
                    }} component='img' src={brand?.headerimg.img1} width='100%' />
                </Box>
                <Box width='50%'>
                    <Stack sx={{
                        flexDirection: {
                            lg: 'column',
                            md: 'column',
                            sm: 'column',
                            xs: 'row'
                        },
                        gap: '8px',
                        '@media (max-width:600px)': {
                            gap: '0px',

                        },

                    }}>
                        <Box component='img' src={brand?.headerimg.img2} height='280px' width='100%' sx={{
                            '@media (max-width:600px)': {
                                gap: '5px',
                                height: '250px'
                            }
                        }} />
                        <Box component='img' src={brand?.headerimg.img3} height='280px' width='100%' sx={{
                            '@media (max-width:600px)': {
                                gap: '5px',
                                height: '250px'
                            }
                        }} />
                    </Stack>

                </Box>
            </Stack></>)}



        </>
    )
}

export default Header
