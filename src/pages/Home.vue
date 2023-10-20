<template>
	<div>
		<cars-filters 
			:brands="brands"
			:filters="filters"
			@change-search="filters.search = $event"
			@change-brand="filters.selectedBrand = $event"
			@clear-filters="handleFiltersClear"
		/>

		<div class="cars">
			<div v-for="(car, index) in filteredCars" :key="index" class="car">
				<img class="car-image" :src="car.image" alt="" />
				<p>Марка: {{ car.brand }}</p>
				<p>Модель: {{ car.name }}</p>
				<p>Максимальная скорость: {{ car.maxSpeed }} км/ч</p>
				<p>Лошадиные силы: {{ car.horsePower }} лс</p>
				<p>Крутящий момент: {{ car.newtonMeter }} нм</p>
				<p>Масса: {{ car.weight }} кг</p>
				<p>Цена: {{ car.price }} $</p>
				<app-button
					@click="handleAddToCart(car)"
				>Добавить в корзину</app-button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watch } from 'vue'
import { useCartStore } from '../store'
import AppButton from '../components/AppButton.vue';
import CarsFilters from "../components/CarsFilters.vue";

const cars = [
  {
		id: 1,
    brand: "Bentley",
    name: "Bentley Continental GT",
    maxSpeed: 310,
    horsePower: 750,
    newtonMeter: 950,
    weight: 1950,
    image:
      "https://motor.ru/imgs/2021/11/30/14/5064335/552c94fc726d8fe41152141756a8de2513e1ff1d.jpg",
		price: 300_000
  },
  {
		id: 2,
    brand: "Bentley",
    name: "Bentley Flying Spur",
    maxSpeed: 300,
    horsePower: 720,
    newtonMeter: 900,
    weight: 2050,
    image:
      "https://cdn.motor1.com/images/mgl/A9Q4V/s3/bentley-flying-spur-hybrid-odyssean-edition-front-corner.jpg",
		price: 280_000
  },
  {
		id: 3,
    brand: "Mercedes Benz",
    name: "Mercedes Benz GT R",
    maxSpeed: 300,
    horsePower: 650,
    newtonMeter: 850,
    weight: 1900,
    image:
      "https://s1.avilon.ru/upload/iblock/9c8/9c8e5dd233a7ee86e9c8769a74f71cff.jpg",
		price: 250_000
  },
  {
		id: 4,
    brand: "Audi",
    name: "Audi A 7",
    maxSpeed: 300,
    horsePower: 600,
    newtonMeter: 800,
    weight: 1800,
    image: "https://cdn.motor1.com/images/mgl/7MK27/s3/abt-audi-rs7-r.jpg",
		price: 200_000
  },
  {
		id: 5,
    brand: "BMW",
    name: "BMW M8 CS",
    maxSpeed: 320,
    horsePower: 650,
    newtonMeter: 750,
    weight: 1700,
    image:
      "https://motor.ru/imgs/2022/01/07/20/5154800/b0ce6840700b7ee93dc7e31f8602e27fb6b1946a.jpg",
		price: 250_000
  },
  {
		id: 6,
    brand: "Porsche",
    name: "Porsche Panamera",
    maxSpeed: 330,
    horsePower: 700,
    newtonMeter: 900,
    weight: 1900,
    image:
      "https://hips.hearstapps.com/hmg-prod/images/2023-porsche-panamera-turbo-s-102-1671562605.jpg?crop=0.761xw:0.856xh;0.106xw,0.0513xh&resize=640:*",
		price: 280_000
  },
  {
		id: 7,
    brand: "Tesla",
    name: "Tesla Model S",
    maxSpeed: 290,
    horsePower: 1000,
    newtonMeter: 1100,
    weight: 2200,
    image:
      "https://3dnews.ru/assets/external/illustrations/2023/02/05/1081423/Model_3.jpg",
		price: 220_000
  },
  {
		id: 8,
    brand: "Hyundai",
    name: "Hyundai Genesis",
    maxSpeed: 280,
    horsePower: 550,
    newtonMeter: 650,
    weight: 1850,
    image:
      "https://avatars.mds.yandex.net/get-verba/1030388/2a000001609d62ad9e35b7f0b42b45a95dbe/cattouch",
		price: 200_000
  },
  {
		id: 9,
    brand: "Toyota",
    name: "Toyota Supra",
    maxSpeed: 270,
    horsePower: 540,
    newtonMeter: 550,
    weight: 1750,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/5c/2020_Toyota_Supra_front_in_red_NYIAS_2019.jpg",
		price: 180_000
  },
  {
		id: 10,
    brand: "Mazda",
    name: "Mazda RX 7",
    maxSpeed: 270,
    horsePower: 400,
    newtonMeter: 450,
    weight: 1650,
    image:
      "https://avatars.mds.yandex.net/get-vertis-journal/4220003/1995-Mazda-RX-7-1.jpg_1651429967397/orig",
		price: 150_000
  },
  {
		id: 11,
    brand: "Ford",
    name: "Ford Mondeo",
    maxSpeed: 260,
    horsePower: 350,
    newtonMeter: 400,
    weight: 1800,
    image:
      "https://motor.ru/imgs/2020/08/07/18/4040911/1ba5495507b055b4cbc11cb9fc31a32ab88b2fcd.jpg",
		price: 100_000
  },
  {
		id: 12,
    brand: "Lexus",
    name: "Lexux LFA",
    maxSpeed: 290,
    horsePower: 500,
    newtonMeter: 550,
    weight: 1800,
    image:
      "https://motor.ru/imgs/2019/08/30/19/3539592/f53613a58cbeafb655a41c6a69ba2828efec5591.jpg",
		price: 290_000
  },
];

export default defineComponent({
	name: 'HomePage',

	components: {
		CarsFilters,
		AppButton
	},

	setup() {
		const cart = useCartStore()

		const filters = reactive(
			JSON.parse(localStorage.getItem('filters')) ||
			{
				search: "",
				selectedBrand: "",
			}
		);

		const brands = new Set(cars.map((car) => car.brand));

		const filteredCars = computed(() => {
      if (!filters.search && !filters.selectedBrand) {
        return cars;
      }

      let result = [];

      if (filters.search) {
        result = cars.filter((car) =>
          car.name.toLowerCase().includes(filters.search.toLowerCase())
        );
      }

      if (filters.selectedBrand) {
        result = cars.filter((car) => car.brand === filters.selectedBrand);
      }

      return result;
    });

		const handleFiltersClear = () => {
      filters.search = "";
      filters.selectedBrand = "";
			console.log(filters)
			localStorage.removeItem('filters')
    };

		const handleAddToCart = (car) => {
			cart.addToCart(car)
		}

		watch(filters, () => {
			localStorage.setItem('filters', JSON.stringify(filters))
		})

    return {
      filters,
      brands,
      filteredCars,
      handleFiltersClear,
			handleAddToCart
    };
	},

	
})
</script>

<style lang="scss" scoped>
	.cars {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 20px;
	}

	.car {
		border: 1px solid #eee;

		img {
			max-width: 100%;
		}

		p {
			padding-left: 10px;
		}
	}
</style>
