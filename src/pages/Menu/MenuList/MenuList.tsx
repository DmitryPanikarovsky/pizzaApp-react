import { ProductCard } from '../../../components/ProductCard/ProductCard'
import { MenuListProps } from './MenuList.types'

export function MenuList ({ products }: MenuListProps) {
    return products.map(prod => (
        <ProductCard
            key={prod.id}
            id={prod.id}
            name={prod.name}
            description={prod.ingredients.join(', ')}
            price={prod.price}
            rating={prod.rating}
            image={prod.image}
        />
    ))
}