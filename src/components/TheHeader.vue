<template>
	<header class="the-header">
		<div class="the-header__top">
			<router-link
				to="/"
			>
				<img 
					src="../assets/images/logo.png" 
					alt="" class="the-header__top-logo"
				>
			</router-link>

			<span class="the-header__top-title">
				Подбор автомобилей <br> в Дербенте
			</span>

			<div class="the-header__top-contacts">
				<router-link
					to="tel:89055138513"
					class="the-header__top-contacts-phone"
			>
					+7 (905) 513 85 13
				</router-link>

				<div class="the-header__top-contacts-social">
					<span class="the-header__top-contacts-social-span">Перезвони мне</span>

					<router-link to="https://t.me/79055138513">
						<img
							class="the-header__top-contacts-social-icon"
							src="../assets/images/telegram-icon.png" 
							alt="telegram"
							width="20"
							height="20"
							>
					</router-link>

					<router-link to="https://wa.me/79055138513">
						<img
							class="the-header__top-contacts-social-icon"
							src="../assets/images/whatsapp-icon.png" 
							alt="whatsapp"
							width="23"
							height="23"
						>
					</router-link>
				</div>
			</div>

			<router-link
				to="/cart"
				class="the-header__top-cart"
			>
				<icon-cart />
				<span v-if="cartCount">{{ cartCount }}</span>
			</router-link>
		</div>
		
		<div class="header__menu">
				<router-link to="/" class="header__menu-link">Главная</router-link>
				<router-link to="/about" class="header__menu-link">Об авторе</router-link>
				<router-link to="/services" class="header__menu-link">Услуги</router-link>
				<router-link to="/contacts" class="header__menu-link">Контакты</router-link>
		</div>
	</header>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useCartStore } from '../store'
import IconCart from './IconCart.vue'

export default defineComponent({
	name: 'TheHeader',

	components: {
		IconCart,
	},

	setup() {
		const cartStore = useCartStore()

		const cartCount = computed(() => cartStore.cart.length)

		return {
			cartCount
		}
	}
})
</script>

<style lang="scss" scoped>
	.the-header {

		&__top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 16px 0;

			&-logo {
				display: block;
				max-width: 200px;
				margin: 0 40px 8px 0;
			}

			&-title {
				font-size: 24px;
				color: var(--color-black);
			}

			&-contacts {
				margin-left: auto;
				&-phone {
				display: block;
				font-size: 24px;
				color: var(--color-black);
				text-decoration: none;
				}
				&-social {
					display: flex;
					justify-content: space-between;
					margin-top: 8px;
					&-span {
						font-size: 18px;
						color: var(--color-red);
					}
					&-icon {
						display: block;
						&:hover {
							opacity: 0.7;
						}
					}
				}
			}

			&-cart {
				position: relative;
				margin-left: 40px;
				border: 1px solid transparent;
				
				&:hover {
					border: 1px solid var(--color-border);
					border-radius: 4px;
				}
				span {
					display: block;
					position: absolute;
					padding: 5px 10px;
					top: 0;
					right: 0;
					border-radius: 50%;
					background-color: var(--color-red);
					color: #fff;
				}
			}
		}
	}

	.header__menu {
		display: flex;
		justify-content: space-around;
		margin-bottom: 30px;
		background-color: var(--color-red);
		border-radius: 4px;
		list-style: none;

		&-link {
			display: block;
			padding: 20px;
			color: #fff;
			text-decoration: none;
			&:hover {
				text-decoration: underline;
			}

			&.router-link-exact-active {
				background-color: #fff;
				color: var(--color-red);
				&:hover {
				text-decoration: none;
			}
			}
		}
	}
</style>

