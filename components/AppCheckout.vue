<template>
  <div>
    <transition name="fade">

      <div v-if="!submitted" class="payment">
        <b-form @submit="pay" @reset="onReset">
          <b-form-group id="formName"
                        label="Ім'я:"
                        label-for="name">
            <b-form-input id="name"
                          type="text"
                          v-model="form.name"
                          required
                          placeholder="Введіть ім'я">
            </b-form-input>
          </b-form-group>
          <b-form-group id="formPhone"
                        label="Телефон:"
                        label-for="phone">
            <b-form-input id="phone"
                          type="number"
                          v-model="form.phone"
                          required
                          placeholder="Введіть телефон">
            </b-form-input>
          </b-form-group>
          <b-form-group id="formEmail"
                        label="Email:"
                        label-for="email">
            <b-form-input id="email"
                          type="email"
                          v-model="form.email"
                          required
                          placeholder="Введіть email">
            </b-form-input>
          </b-form-group>
          <b-button type="submit" @click='pay' variant="primary">Оформити замовлення</b-button>
          <b-button type="reset" variant="danger">Очистити поля</b-button>
        </b-form>


        <!-- <button class='pay-with-stripe' @click='pay'>Оформити замовлення</button> -->
      </div>

      <div v-else class="statussubmit">
        <div v-if="status === 'failure'">
          <p>Сталася помилка!</p>
          <button @click="clearCart">Спробуйте ще раз</button>
        </div>

        <div v-else class="loadcontain">
          <h4>Готово</h4>
          <app-loader />
        </div>
      </div>

    </transition>
  </div>
</template>

<script>
import { Card, createToken } from 'vue-stripe-elements-plus';
import { mapState } from 'vuex';
import AppLoader from './AppLoader.vue';
import axios from 'axios';

export default {
  components: {
    Card,
    AppLoader
  },
  props: {
    total: {
      type: [Number, String],
      default: '50.00'
    },
    success: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      submitted: false,
      complete: false,
      status: '',
      response: '',
      // stripeOptions: {},
      form: {
        email: '',
        name: '',
        phone: null,
        products: []
      },
      token: 'zJfnyjEBLZel8wXEcrEg'
    };
  },
  mounted() {
    this.form.products.push(this.$store.getters.getCart);
  },
  computed: {
    ...mapState(['cart'])
  },
  methods: {
    //  onSubmit (evt) {
    //   evt.preventDefault();
    //   alert(JSON.stringify(this.form));
    // },
    onReset (evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.email = '';
      this.form.name = '';
      this.form.phone = '';
    },
    pay() {
      // evt.preventDefault();

      createToken().then(data => {
        this.submitted = true;
        // console.log(data.token);
        axios
          .post(
            'http://nit.tron.net.ua/api/order/add',
            {
              token: this.token,
              name: this.form.name,
              phone: this.form.phone,
              email: this.form.email,
              products: [this.form.products]
            }
            // {
            //   headers: {
            //     'Content-Type': 'application/json'
            //   }
            // }
          )
          .then(response => {
            this.status = 'success';
            this.$emit('successSubmit');
            this.$store.commit('clearCartCount');

            this.response = JSON.stringify(response, null, 2);
            console.log(this.response);
          })
          .catch(error => {
            this.status = 'failure';
            this.response = 'Error: ' + JSON.stringify(error, null, 2);
          });
      });
    },
    clearCart() {
      this.submitted = false;
      this.status = '';
      this.complete = false;
      this.response = '';
    }
  }
};
</script>

<style scoped>
.payment {
  border: 1px solid #ccc;
  color: black;
  width: 500px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  min-height: 350px;
  justify-content: space-between;
  text-align: center;
}
.statussubmit {
  text-align: center;
}
.stripe-card {
  border: 1px solid #ccc;
}
p {
  margin: 0 0 10px;
}
label {
  color: black;
  margin: 15px 0 5px;
  font-family: 'Playfair Display', sans-serif;
}
button[disabled] {
  color: #ccc;
  border-color: #ccc;
  &:hover {
    background: white;
    color: #ccc;
  }
}
.loadcontain {
  text-align: center;
}
.stripe-card {
  margin-bottom: 10px;
}
.cc-number {
  color: #3964e8;
  font-weight: bold;
}

/* -- transition --*/
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>