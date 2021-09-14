<template>
  <el-dialog
    :title="`${form?.fieldType}属性设置`"
    width="40%"
    v-model="visible"
    append-to-body
    @closed="emit('close')"
  >
    <el-form
      v-if="form"
      :model="form"
      label-width="100px"
      label-position="right"
    >
      <el-form-item label="字段名">
        <el-input v-model="form.fieldName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="字段名称">
        <el-input v-model="form.meaning" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="是否显示" v-if="form.show !== undefined">
        <el-switch v-model="form.show"></el-switch>
      </el-form-item>
      <el-form-item label="是否可查询" v-if="form.beQuery !== undefined">
        <el-switch v-model="form.beQuery"></el-switch>
      </el-form-item>
      <el-form-item label="是否可以多个" v-if="form.limitNum !== undefined">
        <el-switch v-model="form.limitNum"></el-switch>
      </el-form-item>
      <el-form-item label="精度" v-if="form.precision !== undefined">
        <el-select v-model="form.precision" placeholder="请选择">
          <el-option
            v-for="item in [0, 1, 2, 3, 4]"
            :key="item"
            :label="precisionNum.toFixed(item)"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选项配置" v-if="form.optionArr !== undefined">
        <OptionArray :options="form.optionArr" />
      </el-form-item>
      <el-form-item label="对齐方式" v-if="form.alignment !== undefined">
        <el-select v-model="form.alignment" placeholder="请选择">
          <el-option
            v-for="item in [
              { value: 'left', label: '左对齐' },
              { value: 'right', label: '右对齐' },
              { value: 'center', label: '居中' },
            ]"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- todo 评分图标 -->
      <el-form-item label="选择评分图标" v-if="form.subIcon !== undefined">
        <IconSelector :icon-url="form.subIcon" />
      </el-form-item>
      <el-form-item label="选择分数上限" v-if="form.maxScore !== undefined">
        <el-select v-model="form.maxScore" placeholder="请选择">
          <el-option
            v-for="item in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="单位" v-if="form.unit !== undefined">
        <el-input v-model="form.unit" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="千分位显示" v-if="form.thousandthShow !== undefined">
        <el-switch
          v-model="form.thousandthShow"
          active-text="例：1000,000,000"
          inactive-value="例：1000000000"
        ></el-switch>
      </el-form-item>
      <el-form-item label="货币符号" v-if="form.symbol !== undefined">
        <el-select v-model="form.symbol" placeholder="请选择">
          <el-option
            v-for="item in [
              { value: '¥', label: '¥ (人民币)' },
              { value: '€', label: '€ (欧元)' },
              { value: '$', label: '$ (美元)' },
              { value: '¥', label: '¥ (日元)' },
              { value: 'Fr', label: 'Fr (法郎)' },
            ]"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('close')">取 消</el-button>
        <el-button type="primary" @click="commit">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { CardFieldType } from "../../interfaces/CardFieldType";
import OptionArray from "./OptionArray.vue";
import IconSelector from "../../components/IconSelector.vue";
const precisionNum = 1;
const props = defineProps<{ visible: boolean; form: CardFieldType | null }>();
const emit = defineEmits<{
  (e: "close"): void;
}>();
const commit = () => {
  console.log("---点击字段设置确定按钮---", props.form);
  emit("close");
};
</script>
