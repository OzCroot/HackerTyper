;(function($){
	$.fn.megamenu = function(options){
		var settings = $.extend({
			parentClass: 'megamenu',
			baseClass: 'mm_item',
			menuHeight: 400,
			firstColumnClass: 'mm_first',
			middleColumnClass: 'mm_mid',
			lastColumnClass: 'mm_last',
			firstColumnWidth: 220,
			middleColumnWidth: 300,
			lastColumnWidth: 400
		}, options);

		return this.each(function(i, megamenu){
			// Select megamenu and clone <li> elements.
			var $megamenu = $(megamenu).addClass(settings.parentClass),
				$megamenuChildren = $megamenu.children().clone();

			var elementHeightFits = function($element, $parent){
				var currentHeight = 0;

				$parent.children().each(function(i, child){
					var $child = $(child);
					currentHeight += $child.outerHeight(true);
				});

				return (currentHeight <= settings.menuHeight);
			};

			var createNewColumn = function(columnCount){
				return $('<ul />')
					.addClass(settings.baseClass)
					.addClass((columnCount === 0) ? settings.firstColumnClass : settings.middleColumnClass)
					.css({
						left: (columnCount === 0) ? 0 : settings.middleColumnWidth * (columnCount - 1) + settings.firstColumnWidth,
						width: (columnCount === 0) ? settings.firstColumnWidth : settings.middleColumnWidth,
						height: settings.menuHeight
					});
			};

			// Remove megamenu children (we will re-populate this with the data we want.
			$megamenu.children().remove();

			// Loop through the children to find out which we need to turn into megamenus.
			$megamenuChildren.each(function(u, megamenuLi){
				var $megamenuLi = $(megamenuLi),
					$megamenuItem = $megamenuLi.find('>ul'),
					columnCount = 0;

				// Only items that have content to turn into a megamenu.
				if ($megamenuItem.length > 0){
					var $newLi = $megamenuLi.clone().empty(),
						$newMegamenuColumn = createNewColumn(columnCount);

					$megamenu.append($newLi);
					$newLi.append($megamenuLi.children().first());
					$newLi.append($newMegamenuColumn);

					// Loop through a megamenu list ul>li stack so we can place items into columns.
					$megamenuItem.children().each(function(o, megamenuItemChild){
						var $megamenuItemChild = $(megamenuItemChild),
							$newItemChildList = $('<ul />'),
							$megamenuItemChildTitle = $megamenuItemChild.children().first(),
							$megamenuItemChildList = $megamenuItemChildTitle.next();

						// Append title to the new list (2nd level). Remove it and create a new column if it doesnt fit.
						$newMegamenuColumn.append($megamenuItemChildTitle);
						if (!elementHeightFits($megamenuItemChildTitle, $newMegamenuColumn)){
							$megamenuItemChildTitle.remove();
							columnCount++;
							$newMegamenuColumn = createNewColumn(columnCount);
							$newLi.append($newMegamenuColumn);
							$newMegamenuColumn.append($megamenuItemChildTitle);
						}

						// Append ul>li content (3rd level).
						if ($megamenuItemChildList.length > 0) {
							$newMegamenuColumn.append($newItemChildList);
							$megamenuItemChildList.children().each(function(p, itemChildListNode){
								$itemChildListNode = $(itemChildListNode);
								$newItemChildList.append($itemChildListNode);
								if (!elementHeightFits($itemChildListNode, $newMegamenuColumn)){
									$itemChildListNode.remove();
									columnCount++;
									$newMegamenuColumn = createNewColumn(columnCount);
									$newLi.append($newMegamenuColumn);
									$newMegamenuColumn.append($megamenuItemChildTitle.clone());
									$newItemChildList = $newItemChildList.clone();
									$newMegamenuColumn.append($newItemChildList);
									$newItemChildList.append($itemChildListNode);
								}
							});
						}
					});

					// Change final row to have the 'last' settings.
					$newMegamenuColumn
						.removeClass(settings.firstColumnClass + " " + settings.middleColumnClass)
						.addClass(settings.lastColumnClass)
						.width(settings.lastColumnWidth);
				}
				else $megamenu.append($megamenuLi);
			});

		});
	};
})(jQuery);