import { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { FirstEnterInfosPage as Info, FirstEnterInfosPageProps} from "@/data/firstEnterInfosPage";
import { Link } from "expo-router";

export default function FirstEnter() {
  const {firstEntry} = useLocalSearchParams();
  const [pageCount, setPageCount] = useState(0);
  const image = ["image0","image1","image2"]
  const FirstEnterInfosPage:FirstEnterInfosPageProps[] = firstEntry === "Pessoa"? Info[0].Info:Info[1].Info
  return (
    <View className="h-full bg-blue_light justify-center  items-center gap-8">
      <Image
        source={FirstEnterInfosPage[pageCount].image}
        className="h-[40%] w-[100%]"
      />
      <Text>{String(FirstEnterInfosPage[pageCount].title)}</Text>
      <Text className="w-4/5 text-justify h-1/4">
        {String(FirstEnterInfosPage[pageCount].description)}
      </Text>
      <View className="flex-row w-full justify-between px-10">
        <View className="flex-row gap-2">
          {[...Array(3).keys()].map((item, index) => (
            <Pressable onPress={() => setPageCount(index)} key={index}>
              <View
                key={index}
                className={`min-w-2 min-h-2 ${
                  index === pageCount ? "bg-black" : "bg-transparent"
                } border-black border-[1px] m-2 rounded-full`}
              ></View>
            </Pressable>
          ))}
        </View>
        <View>
          {pageCount < 2 ? (
            <Pressable
              onPress={() => pageCount < 2 && setPageCount((prev) => prev + 1)}
            >
              <Text className="text-blue_mid">Próximo</Text>
            </Pressable>
          ) : (
            <Link href={"/home"} className="text-blue_mid">
              Continuar
            </Link>
          )}
        </View>
      </View>
    </View>
  );
}
