<template>
  <div class="filters">
		<input 
			type="search" 
			v-model="localSearchValue" 
			@input="handleSearchInput"
			class="filters__search-input"
			placeholder="Поиск"
		/>

		<select 
			v-model="localSelectedBrand" 
			@change="handleBrandChange"
			class="filters__selected-brand"
		>	
			<option value="">Выбрать бренд</option>
			<option 
				v-for="(brand, index) in brands" 
				:key="index" 
				:value="brand">
					{{ brand }}
			</option>
		</select>

    <!-- <button type="button" @click="handleFiltersClear">Очистить фильтры</button> -->
		<app-button
			type="button"
			@click="handleFiltersClear"
		>
			Очистить фильтры
		</app-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import AppButton from './AppButton.vue';

export default defineComponent({
	name: 'CarsFilters',

	components: {
    AppButton
  },

	props: {
		filters: {
			type: Object,
			default: () => ({})
		},

		brands: {
			type: Set,
			default: () => []
		}
	},

	emits: [
		'change-search',
		'change-brand',
		'clear-filters'
	],

  setup(props, context) {
		const localSearchValue = ref(props.filters.search || '')
		const localSelectedBrand = ref(props.filters.selectedBrand || '')

		const handleSearchInput = (event) => {
			context.emit('change-search', event.target.value)
		}

		const handleBrandChange = (event) => {
			context.emit('change-brand', event.target.value)
		}

		const handleFiltersClear = () => {
			localSearchValue.value = ''
			localSelectedBrand.value = ''
			context.emit('clear-filters')
		}

		return {
			localSearchValue,
			localSelectedBrand,
			handleSearchInput,
			handleBrandChange,
			handleFiltersClear
		}
	},
});
</script>

<style lang="scss" scoped>
.filters {
  margin-bottom: 30px;

	&__search-input,
	&__selected-brand {
		width: 260px;
		margin-right: 24px;
		padding: 8px;
	}
}
</style>
