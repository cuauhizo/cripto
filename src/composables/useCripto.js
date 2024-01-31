import { ref, onMounted, computed } from "vue";

export default function useCripto() {
  const criptomonedas = ref([]);
  const monedas = ref([
    { codigo: "USD", texto: "Dolar de Estados Unidos" },
    { codigo: "MXN", texto: "Peso Mexicano" },
    { codigo: "EUR", texto: "Euro" },
    { codigo: "GBP", texto: "Libra Esterlina" },
  ]);

  const cotizacion = ref({});
  const cargando = ref(false);

  const obtenerCotizacion = async (cotizar) => {
    cargando.value = true;
    cotizacion.value = {};
    const { moneda, criptomoneda } = cotizar;
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
    const respuesta = await fetch(url);
    const data = await respuesta.json();
    // console.log(data.DISPLAY[criptomoneda][moneda]);
    cotizacion.value = data.DISPLAY[criptomoneda][moneda];
    cargando.value = false;
  };

  const mostrarResultado = computed(() => {
    // console.log(Object.values(cotizacion.value).length);
    return Object.values(cotizacion.value).length;
  });

  onMounted(() => {
    const url =
      "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
    fetch(url)
      .then((respuesta) => respuesta.json())
      // .then(data => {
      //   console.log(data)
      // })
      .then(({ Data }) => {
        // console.log(Data)
        criptomonedas.value = Data;
      });
  });

  return {
    monedas,
    criptomonedas,
    cargando,
    cotizacion,
    obtenerCotizacion,
    mostrarResultado,
  };
}
