<script setup>
import { ref, reactive } from 'vue'
import Alerta from './components/Alerta.vue'
import Spinner from './components/Spinner.vue'
import Cotizacion from './components/Cotizacion.vue'
import useCripto from './composables/useCripto'

const {
  monedas,
  criptomonedas,
  cargando,
  cotizacion,
  obtenerCotizacion,
  mostrarResultado,
} = useCripto();
const error = ref('');

const cotizar = reactive({
  moneda: '',
  criptomoneda: '',
});

const cotizarCripto = () => {
  // Validar que cotizar este lleno
  if (Object.values(cotizar).includes('')) {
    // console.log ('Todos los campos son obligatorios');
    error.value = 'Todos los campos son obligatorios';
    return;
  }
  error.value = '';
  // console.log('Cotizando...');
  obtenerCotizacion(cotizar);
};
</script>

<template>
  <div class='contenedor'>
    <h1 class='titulo'>Cotizador de <span>Criptomonedas</span></h1>
    <div class='contenido'>
      <Alerta v-if='error'>{{ error }}</Alerta>
      <form class='formulario' @submit.prevent='cotizarCripto'>
        <div class='campo'>
          <label for='moneda'>Moneda:</label>
          <select id='moneda' v-model='cotizar.moneda'>
            <option value=''>-- Selecciona --</option>
            <option v-for='moneda in monedas' :value='moneda.codigo'>
              {{ moneda.texto }}
            </option>
          </select>
          <!-- <pre>{{ monedas }}</pre> -->
        </div>
        <div class='campo'>
          <label for='cripto'>Criptomonedas:</label>
          <select id='cripto' v-model='cotizar.criptomoneda'>
            <option value=''>-- Selecciona --</option>
            <option
              v-for='criptomoneda in criptomonedas'
              :value='criptomoneda.CoinInfo.Name'
            >
              {{ criptomoneda.CoinInfo.FullName }}
            </option>
          </select>
          <!-- <pre>{{ criptomonedas }}</pre> -->
        </div>
        <input type='submit' value='Cotizar' />
      </form>
      <Spinner v-if='cargando' />
      <Cotizacion v-if='mostrarResultado' :cotizacion="cotizacion"/>
    </div>
  </div>
</template>

<style scoped></style>
