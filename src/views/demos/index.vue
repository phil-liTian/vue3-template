<template>
	<div>
		<a-segmented :options="options" v-model:value="showComponent" />
		<component :is='componentMap[showComponent]'></component>
	</div>
</template>

<script lang="ts" setup>
	import { ref } from 'vue';
	import Modal from './modal.vue'
	const options = ['Modal', 'Form', 'Table']
	const showComponent = ref('Modal');
	const componentMap = {
		Modal,
	}
</script>

<style lang="less" scoped></style>
