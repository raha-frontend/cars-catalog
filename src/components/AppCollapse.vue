<template>
	<div class="app-collapse">
		<div 
			class="app-collapse__header"
			@click="isShow = !isShow"
		>
			<h3 class="app-collapse__title">{{ title }}</h3>
		</div>

		<div 
			v-if="isShow"
			class="app-collapse__content"
		>{{ content }}</div>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
	name: 'AppCollapse',

	props: {
		title: {
			type: String,
			default: ''
		},
		content: {
			type: String,
			default: ''
		}
	},

	setup() {
		const isShow = ref(false)

		return {
			isShow
		}
	},
})
</script>

<style lang="scss" scoped>
	.app-collapse {
		&__header {
			padding: 8px;
			border-bottom: 1px solid var(--color-black);
			cursor: pointer;
		}

		&__title {
			margin: 0;
		}

		&__content {
			padding: 8px;
		}
	}
</style>
