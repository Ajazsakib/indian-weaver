import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';

const ProductCarousel = () =>
{
  // const { data: products, isLoading, error } = useGetTopProductsQuery();
  let products = [1, 2, 3, 4];

  return (

    < div className="image-slder" >
      <Carousel pause='hover' className='bg-primary mb-4'>
        {products.map((product, index) => (
          <Carousel.Item key={index}>
            <Link to={`/product/${index}`}>
              <img src={`/images/slide${product}.jpg`} alt="Image Slider" fluid />
              {/* <Carousel.Caption className='carousel-caption'>
                <h2 className='text-white text-right'>
                  {product.name} (${product.price})
                </h2>
              </Carousel.Caption> */}
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </div >
  )
};

export default ProductCarousel;
