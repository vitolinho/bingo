<script setup lang="ts">
import { ref } from 'vue'
import { GenerateRandomBingoTray } from '../utils/number'
import { generatePDF } from '../utils/bingoTray'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field'
import { Label } from '@/components/ui/label'

const randomBingoTray = ref<number[][]>([])
const quantity = ref<number>(10)

const formSchema = toTypedSchema(z.object({
  quantity: z.number().min(0, 'Min 0').max(100, 'Max 100'),
}))

const { handleSubmit, setFieldValue } = useForm({
  validationSchema: formSchema,
  initialValues: {
    quantity: 10,
  },
})

const onSubmit = handleSubmit(() => {
  generateMultipleBingoPdfs(quantity.value)
})

function generateMultipleBingoPdfs(quantity: number) {
  for (let counter = 1; counter <= quantity; counter++) {
    randomBingoTray.value = GenerateRandomBingoTray()
    generatePDF(randomBingoTray.value, `bingo-tray-${counter}`)
  }
}
</script>

<template>
  <div class="w-full h-screen flex justify-center items-center flex-col gap-20 px-5">
    <p class="font-bold text-3xl md:text-4xl">{{ $t('generate.title') }}</p>
    <form
      class="flex justify-center items-center flex-col gap-5 w-full md:w-[25rem]"
      @submit="onSubmit"
    >
      <NumberField
        class="w-full"
        name="quantity"
        v-model="quantity"
        :min="0"
        :max="100"
        :default-value="quantity"
        @update:model-value="(v) => {
          if (v !== undefined) {
            setFieldValue('quantity', v)
          }
        }"
      >
        <Label for="quantity">{{ $t('generate.label') }}</Label>
        <NumberFieldContent>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldContent>
      </NumberField>
      <Button :disabled="quantity <= 0" type="submit" class="w-full">
        {{ $t('generate.button', { quantity: quantity }) }}
      </Button>
    </form>
  </div>
</template>
