<script>
  import MotionIcon from "../MotionIcon.svelte";
  import { share2Definition as definition } from "@hemaaanth/icons/core";
  let props = $props();
</script>

<MotionIcon {definition} {...props} />
