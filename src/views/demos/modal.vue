<template>
	<div>
		<a-space>
			<p-button @click="handleShowModal1">show modal1</p-button>
			<p-button @click="handleShowModal2">show modal2</p-button>
		</a-space>
		
		<!-- basic draggable -->
		<p-modal
			:bodyStyle="{ color: 'red' }"
			:width="800"
			:min-height="300"
			draggable
			:helpMessage="['hello', 'phil']"
			v-model:open="showModal1"
			title="12312"
		>
			<template #insertFooter>
				<p-button>phil</p-button>
			</template>
		</p-modal>

		<!-- hook register -->
		<p-modal @register="register" />


		<!-- scroll -->
			
		 <p-modal 
		 	:height="200"
		  :open="false">
			<p v-for="item in 20">123</p>
		 </p-modal>
	</div>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { useModal } from '@phil/design'

	const showModal1 = ref(false)
	const showModal2 = ref(false)
	const [ register, { openModal } ] = useModal()

	const handleShowModal1 = () => {
		showModal1.value = true
	}

	const handleShowModal2 = () => {
		openModal()
	}
</script>

<style lang="less" scoped></style>
