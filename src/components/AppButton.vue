<template>
	<button
		:type="type"
		:disabled="disabled"
		class="app-button"
		:class="{ 'app-button_secondory': theme === 'secondory' }"
	>
		<slot />
	</button>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
	props: {
		theme: {
			type: String,
			default: 'primary' // primary, secondory
		},
		type: {
			type: String,
			default: 'button'
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},

	setup() {
		
	},
})
</script>

<style lang="scss" scoped>
	.app-button {
		padding: 4px 16px;
		font-weight: 500;
		font-size: 16px;
		line-height: 31px;
		border: none;
		background-color: var(--color-red);
		border-bottom: 1px solid var(--color-black);
		border-radius: 4px;
		color: #fff;
		cursor: pointer;
		transition: all 0.3s linear;

		&:hover {
			background-color: var(--color-black);
		}

		&_secondory {
			background-color: var(--color-black);

			&:hover {
				background-color: #333;
			}
		}
	}
</style>
