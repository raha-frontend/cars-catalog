<template>
	<div class="services-page">
		<h1>Услуги</h1>

		<app-collapse
			title="Доставка автомобилей из Грузии под ключ"
			content="Цена услуги: 100 т. р."
			class="services-page__collapse"
		/>
		<app-collapse
			title="Доставка автомобилей из Армении под ключ"
			content="Цена услуги: 120 т. р."
			class="services-page__collapse"
		/>
		<app-collapse
			title="Выезд на осмотр авто по Дагестану"
			content="Цена услуги: 10 т. р."
			class="services-page__collapse"
		/>
		<app-collapse
			title="Выезд на осмотр авто по Кавказу"
			content="Цена услуги: 50 т. р."
			class="services-page__collapse"
		/>
	</div>
</template>

<script>
import { defineComponent } from 'vue'
import AppCollapse from '../components/AppCollapse.vue'

export default defineComponent({
	name: 'ServicesPage',

	components: {
		AppCollapse
	}
})
</script>

<style lang="scss" scoped>
	.services-page {
		&__collapse {
			margin-bottom: 16px;
		}
	}
</style>