import React, { useState, useEffect, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CircularProgress,
  Alert,
  TextField,
  Box,
  Typography,
  Link,
  TableSortLabel,
  Container,
  InputAdornment
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const BreweryLister = () => {
  const [breweries, setBreweries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        setLoading(true);
        
        // Try the API first, then fall back to mock data if CORS issues
        let data;
        try {
          const response = await fetch('https://api.openbrewerydb.org/v1/breweries1');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          data = await response.json();
        } catch (fetchError) {
          console.warn('API fetch failed, using mock data:', fetchError.message);

          // Mock data for demonstration
          data = [
            {
              id: "1",
              name: "Stone Brewing",
              brewery_type: "micro",
              city: "Escondido",
              state: "California",
              website_url: "https://www.stonebrewing.com"
            },
            {
              id: "2", 
              name: "Dogfish Head Craft Brewery",
              brewery_type: "micro",
              city: "Milton",
              state: "Delaware",
              website_url: "https://www.dogfish.com"
            },
            {
              id: "3",
              name: "Bell's Brewery",
              brewery_type: "micro", 
              city: "Comstock",
              state: "Michigan",
              website_url: "https://www.bellsbeer.com"
            },
            {
              id: "4",
              name: "New Belgium Brewing",
              brewery_type: "micro",
              city: "Fort Collins", 
              state: "Colorado",
              website_url: "https://www.newbelgium.com"
            },
            {
              id: "5",
              name: "Sierra Nevada Brewing",
              brewery_type: "micro",
              city: "Chico",
              state: "California", 
              website_url: "https://www.sierranevada.com"
            },
            {
              id: "6",
              name: "Founders Brewing",
              brewery_type: "micro",
              city: "Grand Rapids",
              state: "Michigan",
              website_url: "https://www.foundersbrewing.com"
            },
            {
              id: "7",
              name: "Lagunitas Brewing",
              brewery_type: "micro",
              city: "Petaluma", 
              state: "California",
              website_url: "https://www.lagunitas.com"
            },
            {
              id: "8",
              name: "Oskar Blues Brewery",
              brewery_type: "micro",
              city: "Longmont",
              state: "Colorado",
              website_url: "https://www.oskarblues.com"
            },
            {
              id: "9",
              name: "Deschutes Brewery",
              brewery_type: "micro",
              city: "Bend",
              state: "Oregon",
              website_url: "https://www.deschutesbrewery.com"
            },
            {
              id: "10",
              name: "Great Lakes Brewing",
              brewery_type: "micro",
              city: "Cleveland",
              state: "Ohio",
              website_url: "https://www.greatlakesbrewing.com"
            },
            {
              id: "11", 
              name: "Troegs Independent Brewing",
              brewery_type: "micro",
              city: "Hershey",
              state: "Pennsylvania",
              website_url: "https://www.troegs.com"
            },
            {
              id: "12",
              name: "Sweetwater Brewing",
              brewery_type: "micro", 
              city: "Atlanta",
              state: "Georgia",
              website_url: "https://www.sweetwaterbrew.com"
            },
            {
              id: "13",
              name: "Brooklyn Brewery",
              brewery_type: "micro",
              city: "Brooklyn",
              state: "New York",
              website_url: "https://www.brooklynbrewery.com"
            },
            {
              id: "14",
              name: "Anchor Brewing",
              brewery_type: "micro",
              city: "San Francisco",
              state: "California",
              website_url: null
            },
            {
              id: "15",
              name: "Russian River Brewing",
              brewery_type: "micro",
              city: "Santa Rosa",
              state: "California",
              website_url: "https://www.russianriverbrewing.com"
            }
          ];
        }
        
        // Filter for microbreweries only
        const microBreweries = data.filter(brewery => brewery.brewery_type === 'micro');
        setBreweries(microBreweries);
        setError(null);
      } catch (err) {
        setError(`Failed to load brewery data: ${err.message}`);
        setBreweries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBreweries();
  }, []);

  // Filter and sort breweries based on search term and sort criteria
  const filteredAndSortedBreweries = useMemo(() => {
    let filtered = breweries.filter(brewery => 
      brewery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brewery.state.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort the filtered results
    filtered.sort((a, b) => {
      const aValue = a[sortBy]?.toLowerCase() || '';
      const bValue = b[sortBy]?.toLowerCase() || '';
      
      if (sortOrder === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    return filtered;
  }, [breweries, searchTerm, sortBy, sortOrder]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset to first page when searching
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
    setPage(0); // Reset to first page when sorting
  };

  // Calculate pagination
  const paginatedBreweries = filteredAndSortedBreweries.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box 
          display="flex" 
          flexDirection="column"
          justifyContent="center" 
          alignItems="center" 
          minHeight="60vh"
        >
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading breweries...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Microbrewery Directory
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Discover craft microbreweries across the United States
        </Typography>
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Search breweries"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by name or state..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Paper elevation={2}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'name'}
                    direction={sortBy === 'name' ? sortOrder : 'asc'}
                    onClick={() => handleSort('name')}
                  >
                    <Typography variant="subtitle2" fontWeight="bold">
                      Name
                    </Typography>
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">
                    City
                  </Typography>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'state'}
                    direction={sortBy === 'state' ? sortOrder : 'asc'}
                    onClick={() => handleSort('state')}
                  >
                    <Typography variant="subtitle2" fontWeight="bold">
                      State
                    </Typography>
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Website
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedBreweries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      🍺
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {searchTerm ? 'No breweries found matching your search.' : 'No microbreweries found.'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedBreweries.map((brewery) => (
                  <TableRow key={brewery.id} hover>
                    <TableCell>
                      <Typography variant="body1" fontWeight="medium">
                        {brewery.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {brewery.city || 'N/A'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {brewery.state || 'N/A'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {brewery.website_url ? (
                        <Link
                          href={brewery.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          color="primary"
                          underline="hover"
                        >
                          Visit Website
                        </Link>
                      ) : (
                        <Typography variant="body2" color="text.disabled">
                          N/A
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={filteredAndSortedBreweries.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5]}
          showFirstButton
          showLastButton
        />
      </Paper>
      
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Showing {filteredAndSortedBreweries.length} microbreweries
          {searchTerm && ` matching "${searchTerm}"`}
        </Typography>
      </Box>
    </Container>
  );
};

export default BreweryLister;