export default function decorate(block) {
  // Handle empty columns-clinic blocks (used as parent-block markers)
  if (!block.firstElementChild || !block.firstElementChild.children || block.firstElementChild.children.length === 0) {
    return;
  }

  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);
  block.classList.add('columns-clinic-img-col');

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-clinic-img-col');
        }
      }
    });
  });
}
