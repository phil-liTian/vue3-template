<template>
	<div>
		<a-segmented :options="options" v-model:value="showComponent" />
		<component :is='componentMap[showComponent]'></component>
	</div>
</template>

<script lang="ts" setup>
	import { ref } from 'vue';
	import Input from './input.vue';
	import Modal from './modal.vue'
	const options = ['Input', 'Modal', 'Form', 'Table']
	const showComponent = ref('Input');
	const componentMap = {
		Input,
		Modal,
	}
</script>

<style lang="less" scoped></style>
