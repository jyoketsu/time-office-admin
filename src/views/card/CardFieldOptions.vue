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
      :rules="rules"
      ref="ruleForm"
    >
      <el-form-item label="字段名" prop="fieldName">
        <el-input v-model="form.fieldName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="字段名称" prop="meaning">
        <el-input v-model="form.meaning" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="是否显示" v-if="form.show !== undefined" prop="show">
        <el-switch v-model="form.show"></el-switch>
      </el-form-item>
      <el-form-item
        label="是否可查询"
        v-if="form.beQuery !== undefined"
        prop="beQuery"
      >
        <el-switch v-model="form.beQuery"></el-switch>
      </el-form-item>
      <el-form-item
        label="是否可以多个"
        v-if="form.limitNum !== undefined"
        prop="limitNum"
      >
        <el-switch v-model="form.limitNum"></el-switch>
      </el-form-item>
      <el-form-item
        label="精度"
        v-if="form.precision !== undefined"
        prop="precision"
      >
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
      <el-form-item
        label="选项配置"
        v-if="form.optionArr !== undefined"
        prop="optionArr"
      >
        <OptionArray :options="form.optionArr" />
      </el-form-item>
      <el-form-item
        label="对齐方式"
        v-if="form.alignment !== undefined"
        prop="alignment"
      >
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
      <el-form-item
        label="选择评分图标"
        v-if="form.subIcon !== undefined"
        prop="subIcon"
      >
        <IconSelector :icon-url="form.subIcon" @click="handleClickIcon" />
      </el-form-item>
      <el-form-item
        label="选择分数上限"
        v-if="form.maxScore !== undefined"
        prop="maxScore"
      >
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
      <el-form-item label="单位" v-if="form.unit !== undefined" prop="unit">
        <el-input v-model="form.unit" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="千分位显示"
        v-if="form.thousandthShow !== undefined"
        prop="thousandthShow"
      >
        <el-switch
          v-model="form.thousandthShow"
          active-text="例：1000,000,000"
          inactive-value="例：1000000000"
        ></el-switch>
      </el-form-item>
      <el-form-item
        label="货币符号"
        v-if="form.symbol !== undefined"
        prop="symbol"
      >
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
import store from "../../store";
import { ref, watchEffect } from "vue";
import { ElMessage } from "element-plus";
const precisionNum = 1;
const props = defineProps<{
  index: number;
  visible: boolean;
  form: CardFieldType | null;
  isEdit: boolean;
}>();
const emit = defineEmits<{
  (e: "close"): void;
}>();

const ruleForm = ref<any>(null);
const rules = ref<any>({});

watchEffect(() => {
  if (props.visible) {
    rules.value = {
      fieldName: [
        {
          required: true,
          validator: (rule: any, value: any) => /^[A-Za-z0-9]+$/.test(value),
          message: "字段名不正确！",
          trigger: "change",
        },
        {
          min: 3,
          max: 50,
          message: "长度在 3 到 50 个字符",
          trigger: "blur",
        },
      ],
      meaning: [
        {
          min: 3,
          max: 50,
          message: "长度在 3 到 50 个字符",
          trigger: "blur",
        },
      ],
    };
    if (props.form?.unit !== undefined) {
      rules.value["unit"] = [
        {
          required: true,
          message: "请输入单位！",
          trigger: "change",
        },
        {
          min: 1,
          max: 5,
          message: "长度在 1 到 5 个字符",
          trigger: "blur",
        },
      ];
    }
  }
});

const handleClickIcon = (url: string) => {
  if (props.form) {
    props.form.subIcon = url;
  }
};
const commit = () => {
  if (ruleForm.value) {
    ruleForm.value.validate((valid: any) => {
      if (valid) {
        if (props.isEdit) {
          if (props.form?._key) {
            store.dispatch("card/editCardField", {
              index: props.index,
              field: props.form,
            });
          } else {
            store.dispatch("card/addCardField", props.form);
          }
        }
        emit("close");
      } else {
        ElMessage.error("请正确输入！");
      }
    });
  }
};
</script>
