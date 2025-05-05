import React, { useEffect, useState } from 'react'
import { Box, Button, Skeleton, Stack, Typography } from '@mui/material'
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getData } from '../../utils/detailview';
interface ItemDetailType {
    id: number,
    image: string,
    name: string,
    item: string,
    cost: string,
    area: string,
    time: string,
    category?: string
}

const HeroSection: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const [allBrands, setAllBrands] = useState<ItemDetailType[]>([]);

    const [selectedBrand, setSelectedBrand] = useState<ItemDetailType | null>(null);

    const { data: getmyData, isLoading: isdataloading } = useQuery({
        queryKey: ["getdata"],
        queryFn: getData
    });

    useEffect(() => {
        if (getmyData) {
            setAllBrands(getmyData);
        }
    }, [getmyData]);




    useEffect(() => {
        const brandId = parseInt(id || '1');
        console.log(brandId)
        const selectedItem = allBrands.find((item) => brandId === item.id);
        setSelectedBrand(selectedItem || null);
    }, [id, allBrands]);

    const [selectedIndex, setSelectedIndex] = useState(0);
    const handleButtonClick = (index: number) => {
        setSelectedIndex(index);
    }

    return (
        <>

            <Box sx={{ display: 'flex', justifyContent: 'center', margin: '30px' }}>
                <Stack sx={{
                    flexDirection: {
                        lg: 'row',
                        md: 'row',
                        sm: 'row'


                    },
                    '@media (max-width:600px)': {
                        flexDirection: 'column'
                    },
                }} alignItems={'center'}>
                    {isdataloading ? (
                        <>
                            <Skeleton variant="rectangular" width={180} height={180} sx={{ borderRadius: '10px', margin: '10px' }} />
                            <Box>
                                <Skeleton width={200} height={30} />
                                <Skeleton width={150} height={20} />
                                <Skeleton width={180} height={20} />
                                <Skeleton width={220} height={20} />
                                <Skeleton width={250} height={20} />
                                <Stack direction="row" spacing={2} mt={1}>
                                    <Skeleton variant="rectangular" width={100} height={36} />
                                    <Skeleton variant="rectangular" width={100} height={36} />
                                    <Skeleton variant="rectangular" width={100} height={36} />
                                </Stack>
                            </Box>
                        </>
                    ) : (
                        <>

                            <Box component='img' src={selectedBrand?.image} sx={{
                                height: '180px',
                                width: '180px',
                                padding: '10px',

                            }} />
                            <Box>
                                <Typography>
                                    {selectedBrand?.name}
                                </Typography>
                                <Typography color='#999999'>
                                    {selectedBrand?.item}

                                </Typography>
                                <Stack direction={'row'}>
                                    <Typography color='#999999'>
                                        Average Cost:
                                    </Typography>

                                    <Typography ml={1}>
                                        {selectedBrand?.cost}
                                    </Typography>
                                </Stack>

                                <Typography color='#999999'>
                                    {selectedBrand?.area}

                                </Typography>

                                <Typography >
                                    <Stack direction={'row'} spacing={2}>

                                        <Box color='red'>Open Now</Box> <Box color='#999999'>{selectedBrand?.time} (Today)</Box>
                                    </Stack>
                                </Typography>

                                <Stack direction={'row'}
                                    mt={1}
                                    spacing={{
                                        md: 2,
                                        lg: 2,
                                        sm: 2,
                                        xs: 1
                                    }}> {/* Added spacing between buttons */}
                                    {/* Button for "Order online" */}
                                    <Button

                                        variant="outlined"
                                        onClick={() => handleButtonClick(0)}  // Set selectedIndex to 0 for "Order online"
                                        sx={{
                                            borderColor: '#FFC300',
                                            '&:hover': {
                                                backgroundColor: '#FFA500',
                                                color: 'white'
                                            },

                                            bgcolor: selectedIndex === 0 ? "#FFA500" : "transparent", // Highlight if selected
                                            color: selectedIndex === 0 ? "#fff" : "black",  // Text color change if selected
                                            fontWeight: selectedIndex === 0 ? 'bold' : 'normal', // Emphasizing the selected item
                                            '@media (max-width:600px)': {
                                                fontSize: '10px'  // Corrected 'size' to 'fontSize'
                                            },

                                        }}
                                    >
                                        Order online
                                    </Button>

                                    {/* Button for "Directions" */}
                                    <Button
                                        variant="outlined"
                                        onClick={() => handleButtonClick(1)}  // Set selectedIndex to 1 for "Directions"
                                        sx={{
                                            borderColor: '#FFC300',
                                            '&:hover': {
                                                backgroundColor: '#FFA500',
                                                color: 'white'
                                            },
                                            bgcolor: selectedIndex === 1 ? "#FFA500" : "transparent", // Highlight if selected
                                            color: selectedIndex === 1 ? "#fff" : "black",  // Text color change if selected
                                            fontWeight: selectedIndex === 1 ? 'bold' : 'normal', // Emphasizing the selected item
                                            '@media (max-width:600px)': {
                                                fontSize: '10px'  // Corrected 'size' to 'fontSize'
                                            },
                                        }}
                                    >
                                        Directions
                                    </Button>

                                    {/* Button for "Share" */}
                                    <Button
                                        variant="outlined"
                                        onClick={() => handleButtonClick(2)}  // Set selectedIndex to 2 for "Share"
                                        sx={{
                                            borderColor: '#FFC300',
                                            '&:hover': {
                                                backgroundColor: '#FFA500',
                                                color: 'white'
                                            },
                                            bgcolor: selectedIndex === 2 ? "#FFA500" : "transparent", // Highlight if selected
                                            color: selectedIndex === 2 ? "#fff" : "black",  // Text color change if selected
                                            fontWeight: selectedIndex === 2 ? 'bold' : 'normal', // Emphasizing the selected item
                                            '@media (max-width:600px)': {
                                                fontSize: '10px'  // Corrected 'size' to 'fontSize'
                                            },
                                        }}
                                    >
                                        Share
                                    </Button>
                                </Stack>
                            </Box>
                        </>

                    )}
                </Stack>


            </Box>



        </>
    )
}

export default HeroSection;
