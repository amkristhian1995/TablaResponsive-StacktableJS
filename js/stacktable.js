(function($) {
  $.fn.cardtable = function(options) {
    var $tables = this;
    var defaults = {headIndex:0};
    var settings = $.extend({}, defaults, options);
    var headIndex;
    if(options && options.headIndex)
      headIndex = options.headIndex;
    else
      headIndex = 0;
    return $tables.each(function() {
      var $table = $(this);
      if ($table.hasClass('stacktable')) return;
      var table_css = $(this).prop('class');
      var $stacktable = $('<div></div>');
      if (typeof settings.myClass !== 'undefined') $stacktable.addClass(settings.myClass);
      var markup = '';
      var $caption, $topRow, headMarkup, bodyMarkup, tr_class;
      $table.addClass('stacktable large-only');
      $caption = $table.find(">caption").clone();
      $topRow = $table.find('>thead>tr,>tbody>tr,>tfoot>tr,>tr').eq(0);
      $table.siblings().filter('.small-only').remove();
      $table.find('>tbody>tr').each(function() {
        headMarkup = '';
        bodyMarkup = '';
        tr_class = $(this).prop('class');
        $(this).find('>td,>th').each(function(cellIndex) {
          if ($(this).html() !== '') {
            bodyMarkup += '<tr class="' + tr_class +'">';
            if ($topRow.find('>td,>th').eq(cellIndex).html())
              bodyMarkup += '<td class="st-key">'+$topRow.find('>td,>th').eq(cellIndex).html()+'</td>';
            else
              bodyMarkup += '<td class="st-key"></td>';
            bodyMarkup += '<td class="st-val '+$(this).prop('class')  +'">'+$(this).html()+'</td>';
            bodyMarkup += '</tr>';
          }
        });
        markup += '<table class="'+ table_css +' stacktable small-only"><tbody>' + headMarkup + bodyMarkup + '</tbody></table>';
      });
      $stacktable.prepend($caption);
      $stacktable.append($(markup));
      $table.before($stacktable);
      $('td.st-key').append(' :');
    });
  };
}(jQuery));