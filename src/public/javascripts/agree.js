function init() {
  const $form = document.querySelector('.form-agree');
  const $nextBtn = document.querySelector('.next-btn');
  const $checkboxGroup = document.querySelector('.form-checkbox-group');
  const $agreeAllCheckbox = $form.querySelector('#agree-all');
  const $checkboxList = [
    ...$form.querySelectorAll('.form-checkbox > input:not(#agree-all)'),
  ];
  const $requiredCheckboxList = $checkboxList.filter(
    (element) => element.required,
  );

  $checkboxGroup.addEventListener('change', (event) => {
    const $target = event.target;

    if ($target.id === 'agree-all') {
      $checkboxList.forEach(($checkbox) => {
        $checkbox.checked = $target.checked;
      });
      $nextBtn.disabled = !$target.checked;
    }

    if ($target.required) {
      $nextBtn.disabled = !$requiredCheckboxList.every(
        (element) => element.checked,
      );
    }

    $agreeAllCheckbox.checked = $checkboxList.every(
      (element) => element.checked,
    );
  });
}

init();
