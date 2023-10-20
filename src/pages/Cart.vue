<template>
  <div class="cart">
    <h2 class="cart__title">{{ list.length ? 'Товаров в корзине' : 'Корзина товаров пуста' }}</h2>
    <div class="products">
      <div v-for="item in list" :key="item.id" class="product">
        <div class="product__info">
          <img
            class="product__img"
            :src="item.image"
            alt=""
          />
          <p class="product__name">{{ item.name }}</p>
        </div>

        <div class="product__right">
          <div class="counter">
            <button type="button" class="counter__minus">-</button>
            <input
              type="text"
              min="1"
              max="5"
              value="1"
              class="counter__value"
            />
            <button type="button" class="counter__plus">+</button>
          </div>
          <app-button 
						class="product__delete"
						@click="handleCarDelete(item.id)"
					>Удалить</app-button>
        </div>
      </div>
    </div>

    <div 
			v-if="list.length"
			class="form"
		>
      <h2 class="cart__title">Данные для связи</h2>
      <input
        v-model="formModel.fullName"
        type="text"
        placeholder="ФИО"
        class="form__field"
      />
      <input
        v-model="formModel.phone"
        v-maska
        data-maska="+7 (###) ### ## ##"
        type="text"
        placeholder="Телефон"
        class="form__field form__field_phone"
      />
      <input
        v-model="formModel.email"
        type="email"
        placeholder="Почта"
        class="form__field"
      />
      <div class="form__btn-group">
        <app-button @click="handleOrderBtnClick"> Оформить заказ </app-button>
        <app-button @click="handleOrderBtnClear" theme="secondory"> Очистить поля </app-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import { vMaska } from "maska";
import { useCartStore } from '../store'
import AppButton from "../components/AppButton.vue";

export default defineComponent({
  name: "Cart",

  components: {
    AppButton,
  },

  directives: {
    maska: vMaska,
  },

  setup() {
		const cartStore = useCartStore()

    const formModel = reactive({
      fullName: "",
      phone: "",
      email: "",
    });

		const list = computed(() => {
			return cartStore.cart
		});

		const handleCarDelete = (carId) => {
			cartStore.deleteById(carId)
		};

    const handleOrderBtnClear = () => {
      formModel.fullName = ""; 
			formModel.phone = ""; 
			formModel.email = "";
    };

    const handleOrderBtnClick = () => {
      handleOrderBtnClear();
    };

    return {
      formModel,
			list,
			handleCarDelete,
      handleOrderBtnClick,
      handleOrderBtnClear,
    };
  },
});
</script>

<style lang="scss" scoped>
.cart {
  padding-bottom: 48px;

  &__title {
    margin-top: 0;
  }
}

.products {
  margin-bottom: 48px;
}

.product {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  border: 1px solid var(--color-border);
  border-radius: 4px;

  &__info {
    display: flex;
    align-items: center;
  }

  &__img {
    display: block;
    width: 200px;
    margin-right: 16px;
  }

  &__right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-right: 16px;
  }
}

.counter {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 106px;
  height: 30px;
  margin-bottom: 16px;
  border: 1px solid rgba(40, 47, 54, 0.15);
  border-radius: 5px;

  &__minus,
  &__plus {
    padding-right: 5px;
    text-align: right;
    border: none;
    background-color: transparent;
    width: 35px;
    height: 100%;
    color: rgba(40, 47, 54, 0.3);
    font-size: 17px;
    cursor: pointer;
  }

  &__plus {
    text-align-last: left;
  }

  &__value {
    text-align: center;
    border: none;
    width: 35px;
    height: 100%;
  }

  &__delete {
    display: block;
    width: 100%;
    margin-left: auto;
  }
}

.form {
  &__field {
    display: block;
    margin-bottom: 16px;
    padding: 0 16px;
    width: 640px;
    height: 32px;
    background-color: var(--color-border);
    border: none;
    border-radius: 4px;
    &:hover {
      background-color: #dadada;
    }

    &_phone {
      width: 320px;
    }
  }

  &__btn-group {
    display: flex;
    align-items: center;
    column-gap: 16px;
  }
}
</style>
