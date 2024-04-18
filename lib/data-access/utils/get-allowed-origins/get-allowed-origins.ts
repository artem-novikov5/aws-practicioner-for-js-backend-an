export const getAllowedOrigin = (origins: string[]) => {
  const condition = origins
    .map((x) => `$origin.matches(\"${x}\")`)
    .reduce((l, r) => `${l} || ${r}`);

  return `#set($origin = $input.params(\"Origin\"))\n#if($origin == \"\") #set($origin = $input.params(\"origin\")) #end\n#if(${condition})\n  #set($context.responseOverride.header.Access-Control-Allow-Origin = $origin)\n#end\n`;
};
