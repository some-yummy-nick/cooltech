var SliderWidjet = (function () {

    var _insertValues = function ($this) {
        var
            container = $this.closest(".filter__slider"),
            from = container.find(".filter__slider-input_from"),
            to = container.find(".filter__slider-input_to");

        var values = $this.slider("option","values");

        from.val(values[0]);
        to.val(values[1]);
    }

    return {
        init: function () {

            $(".filter__slider-element").each(function () {
                var
                    $this = $(this),
                    min = parseInt($this.data("min")),
                    max = parseInt($this.data("max"));

                $this.slider({
                    range: true,
                    min: min,
                    max: max,
                    values: [ min, max ],
                    slide: function(  ) {
                        _insertValues($this);
                    },
                    create:function(){
                        _insertValues($this);
                    }
                });
            });
        }
    }
}());

var RatingWidjet = (function () {
    
    var _letTheStarsShining = function (ratingAmount) {
        var
            starsArray = [];

        for(var i=0; i<5; i++) {
            var
                starClassName = (i < ratingAmount) ? "products__rating-stars-item  products__rating-stars-item_filled" : "products__rating-stars-item";

            var star = $("<li>", {
                class : starClassName
            });

            starsArray.push(star);
        }

        return starsArray;
    }
    var _generateMarkup = function(ratingAmount, elementToAppend){
        var
            ul = $("<ul>",{
                class: "products__rating-stars",
                html : _letTheStarsShining(ratingAmount)
            });

        var
            ratingDispdlay = $("<div>", {
                class : "products__rating-amount",
                text : ratingAmount
            });

        elementToAppend.append([ul, ratingDispdlay]);
    }
    return {
        init: function () {
            $(".products__rating").each(function () {
                var
                    $this = $(this),
                    ratingAmount = parseInt($this.data("rating"));

                _generateMarkup(ratingAmount, $this);
            });
        }
    }
}());
$(document).ready(function () {

    if($(".products__rating").length) {
        RatingWidjet.init();
    }

    if($(".filter__slider-element").length) {
        SliderWidjet.init();
    }
});