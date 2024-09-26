import { List, ListItem, ListItemText, Typography } from '@mui/material';

import { Product } from '../../types';
import React from 'react';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <List>
      {products.map((product) => (
        <ListItem key={product.plu}>
          <ListItemText
            primary={`${product.plu} - ${product.fullname}`}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                >
                  {product.commodity}
                </Typography>
                {` — ${product.variety}`}
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ProductList;
