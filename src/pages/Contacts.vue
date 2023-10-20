<template>
  <div class="contacts-page">
		<h1>Контакты</h1>
    <div class="contacts-page__info">
			<p>Адрес: г. Дербент ул. Сальмана д.5</p>
			<p>Номер телефона: +7(905) 427 15 18</p>
		</div>
    <div class="contacts-page__grid">
      <div class="contacts-page__map">
        <h2 class="contacts-page__title">Мы на карте</h2>

				<iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Aad3f7b76ca1c17fe3c060c169bba14cea8225aa76677d6821cf946f31c38858b&amp;source=constructor" width="100%" height="390" frameborder="0"></iframe>
      </div>
      <form class="contacts-page__form">
        <h2 class="contacts-page__title">Обратная связь</h2>

				<label class="contacts-page__label">
					<input 
						type="text" 
						placeholder="Введите имя"
						v-model="formModel.name"
						@input="saveFormModel"
					>
				</label>

				<label class="contacts-page__label">
					<input
						v-maska 
						data-maska="+7 (###) ### ## ##" 
						type="tel" 
						placeholder="Введите номер телефона"
						v-model="formModel.phone"
						@input="saveFormModel"
					>
				</label>

				<label class="contacts-page__label">
					<input 
						type="email" 
						placeholder="Введите email"
						v-model="formModel.email"
						@input="saveFormModel"
					>
				</label>

				<label class="contacts-page__label">
					<textarea 
						placeholder="Сообщение"
						v-model="formModel.text"
						@input="saveFormModel"
					></textarea>
				</label>

				<div class="contacts-page__actions">
					<app-button 
						@click="handleSendBtnClick"
					>Отправить</app-button>
					<app-button 
						@click="handleFormInputClear"
						theme="secondory"
					>
						Очистить поля
					</app-button>
				</div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useNotification } from "@kyvg/vue3-notification";
import { vMaska } from "maska"

import AppButton from '../components/AppButton.vue';

const CONTACTS_FORM_MODEL_KEY = 'contactsForm'

export default defineComponent({
	name: 'ContactsPage',

	components: {
    AppButton
  },

	directives: {
		maska: vMaska 
	},

	setup() {
		const { notify }  = useNotification()

		//данные полей формы
		const formModel = reactive(
			JSON.parse(localStorage.getItem(CONTACTS_FORM_MODEL_KEY)) ||
			{
				name: '',
				phone: '',
				email: '',
				text: ''
			}
		);

		const saveFormModel = () => {
			localStorage.setItem(CONTACTS_FORM_MODEL_KEY, JSON.stringify(formModel))
		}

		//функция очистки полей
		const handleFormInputClear = () => {
			formModel.name = ''
			formModel.phone = ''
			formModel.email = ''
			formModel.text = ''
			// saveFormModel()
			localStorage.removeItem(CONTACTS_FORM_MODEL_KEY)
		}

		const handleSendBtnClick = async () => {
			//выводим ошибку, если поля не заполнены
			if (!formModel.name && !formModel.phone && !formModel.email && !formModel.text) {
				notify({
					text: "Заполните поля!",
					type: 'error',
				});
				return;
			}

			try {
				// отправляем запрос, внутри ковычек был какой то адрес и мы бы сюда отправляли нашу formData
				await fetch('')
				// throw new Error() иммитируем ошибку, чтоб попасть в catch
				notify({
					text: 'Сообщение отправлено',
					type: 'success'
				})
			} catch(error) {
				notify({
					text: 'Сообщение не отправлено',
					type: 'error'
				})
			}

			handleFormInputClear()
		}

		//возвращаем
		return {
			formModel,
			handleSendBtnClick,
			handleFormInputClear,
			saveFormModel
		}
	},
});
</script>


<style lang="scss" scoped>
	.contacts-page {
		padding-bottom: 24px;
		
		&__grid {
			display: grid;
			grid-template-columns: 1fr 320px;
			grid-column-gap: 32px;
		}

		&__label {
			display: block;
			margin-bottom: 16px;

			input {
				width: 320px;
				height: 32px;
				padding: 0 16px;
			}

			textarea {
				width: 320px;
				max-height: 192px;
				min-height: 64px;
				padding: 8px 16px;
				resize: vertical;
			}
		}

		&__actions {
			display: flex;
			column-gap: 16px;
		}
	}
</style>
